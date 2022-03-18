import { Portfolio, SymbolModel } from '@/db/entities';
import { PlaidMissingSecuritiesError } from '@/db/entities/plaid';
import { mapToFigi } from '@/open-figi/open-figi';
import { InvestmentsHoldingsGetResponse } from 'plaid';
import { equityOnly } from './equityOnly';
import { flattenHoldings } from './flatten';
import { BasicPortfolio } from './types';

export const addPlaidHoldings = async (
  forPortfolio: BasicPortfolio,
  holdings: InvestmentsHoldingsGetResponse,
): Promise<BasicPortfolio & { holdings: Portfolio['holdings'] }> => {
  const portfolio = forPortfolio;
  const equityHoldings = flattenHoldings(holdings).filter(equityOnly);

  const portfolioHoldings = equityHoldings
    .filter(
      (holding) => holding.account_id === forPortfolio?.plaid?.linkedAccountId,
    )
    .map((holding) => {
      return {
        security_id: holding?.security_id,
        security: holding.security,
        costBasis: holding.cost_basis,
        quantity: holding.quantity,
        // TODO: support other instruments
        holdingType: `shares`,
      };
    });

  const holdingsWithFigiMappings = portfolioHoldings.map((h) => ({
    ...h,
    mapToFigi: {
      isin: h.security?.isin || undefined,
      cusip: h.security?.cusip || undefined,
      sedol: h.security?.sedol || undefined,
    },
  }));

  const mapToFigiInputs = holdingsWithFigiMappings.map((h) => h.mapToFigi);
  const figis = await mapToFigi(mapToFigiInputs);

  const withFigi = portfolioHoldings.map((h, index) => ({
    ...h,
    figi: figis[index]?.figi || null,
  }));

  const holdingsWithoutFigiData = withFigi.filter((h) => h.figi);
  const holdingsWithFigiData = withFigi.filter((h) => !!h.figi);

  let error;
  if (figis.length < mapToFigiInputs.length) {
    error = new PlaidMissingSecuritiesError(
      `We could not identify one or more of the securities imported`,
      holdingsWithoutFigiData.map((h) => {
        const original = equityHoldings.find(
          (original) => original.security_id === h.security_id,
        );
        return {
          name: original?.security?.name || undefined,
          symbol: original?.security?.ticker_symbol || undefined,
        };
      }),
    );
  }

  const symbols = await SymbolModel.find({
    figi: { $in: figis.map((f) => f.figi) },
  });

  console.log(
    `Found `,
    symbols.length,
    ` symbols in the imported portfolio out of `,
    portfolioHoldings.length,
  );

  // Don't overwrite the missing figi error, as its more important
  if (symbols.length < portfolioHoldings.length && !error) {
    error = new PlaidMissingSecuritiesError(
      `There was an error importing some symbols to this portfolio.`,
      figis
        .filter((f) => !symbols.find((s) => s.figi === f.figi))
        .map((f) => ({
          exchange: f.exchCode,
          symbol: f.ticker,
          name: f.name,
          figi: f.figi,
        })),
    );
  }
  if (portfolio?.plaid) {
    portfolio.plaid.missingSecuritiesError = error;
  }

  const holdingsWithSymbolData = holdingsWithFigiData
    .map((h) => ({
      ...h,
      symbol: symbols.find((s) => s.figi === h.figi),
    }))
    .filter((h) => !!h.symbol);

  return {
    ...portfolio,
    holdings: holdingsWithSymbolData as any,
  };
};
