import { Portfolio } from '@/db/entities';
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

  return {
    ...portfolio,
    holdings,
  };
};
