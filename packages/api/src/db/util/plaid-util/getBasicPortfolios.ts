import { InvestmentsHoldingsGetResponse } from 'plaid';
import { BasicPortfolio } from './types';

/**
 * Creates a list of basic portfolios, this only includes account info, name etc.
 * No holdings or transactions
 */
export const getBasicPortfolios = (
  holdings: InvestmentsHoldingsGetResponse,
): BasicPortfolio[] => {
  const accounts = holdings.accounts.filter(
    (account) => account.type === `investment`,
  );

  const portfolios: BasicPortfolio[] = accounts.map((account) => ({
    plaid: {
      linkedAccountId: account.account_id,
      isLinked: true,
    },
    cash: account?.balances.available || 0,
    name: account?.name,
    private: true,
  }));

  return portfolios;
};
