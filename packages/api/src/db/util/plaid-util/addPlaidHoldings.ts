import { Holding, Portfolio } from '@/db/entities';
import { PlaidMissingSecuritiesError } from '@/db/entities/plaid';
import { InvestmentsHoldingsGetResponse } from 'plaid';
import { equityOnly } from './equityOnly';
import { flattenHoldings } from './flatten';
import { plaidHoldingsToBaggersHoldings } from './plaidHoldingsToBaggersHoldings';
import { BasicPortfolio } from './types';

export const addPlaidHoldings = async (
  forPortfolio: BasicPortfolio,
  plaidHoldings: InvestmentsHoldingsGetResponse,
): Promise<BasicPortfolio & { holdings: Portfolio['holdings'] }> => {
  const portfolio = forPortfolio;
  const equityHoldings = flattenHoldings(plaidHoldings).filter(equityOnly);

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
        plaidHolding: holding,
      };
    });

  const { holdings, missing } = await plaidHoldingsToBaggersHoldings(
    portfolioHoldings.map((h) => h.plaidHolding),
  );

  let missingSecuritiesError;
  if (missing?.length) {
    missingSecuritiesError = new PlaidMissingSecuritiesError(
      `There was an error importing the following securities`,
      missing.map((m) => ({
        symbol: m.security?.ticker_symbol || 'UNKNOWN',
        name: m.security?.name || undefined,
      })),
    );
  }

  return {
    ...portfolio,
    holdings: holdings as Holding[],
    plaid: {
      ...(portfolio.plaid || {}),
      isLinked: true,
      missingSecuritiesError,
    },
  };
};
