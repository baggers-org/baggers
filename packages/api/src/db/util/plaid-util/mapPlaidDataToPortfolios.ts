import { Portfolio } from '@/db/entities';
import {
  InvestmentsHoldingsGetResponse,
  InvestmentsTransactionsGetResponse,
} from 'plaid';
import { addPlaidHoldings } from './addPlaidHoldings';
import { addPlaidTransactions } from './addPlaidTransactions';
import { getBasicPortfolios } from './getBasicPortfolios';

export const mapPlaidDataToPortfolios = async (
  holdings: InvestmentsHoldingsGetResponse,
  transcations: InvestmentsTransactionsGetResponse,
): Promise<Omit<Portfolio, 'owner' | 'totalValue'>[]> => {
  const portfolios = getBasicPortfolios(holdings);

  const portfoliosWithTransactions = portfolios.map((portfolio) =>
    addPlaidTransactions(portfolio, transcations),
  );

  const portfolioWithHoldings = await Promise.all(
    portfoliosWithTransactions.map(async (portfolio) =>
      addPlaidHoldings(portfolio, holdings),
    ),
  );

  console.log(portfolioWithHoldings);

  return portfolioWithHoldings;
};
