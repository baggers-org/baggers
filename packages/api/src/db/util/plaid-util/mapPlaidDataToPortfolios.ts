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
): Promise<Portfolio[]> => {
  const portfolios = await getBasicPortfolios(holdings);

  const portfoliosWithTransactions = portfolios.map((portfolio) =>
    addPlaidTransactions(portfolio, transcations),
  );

  const portfolioWithHoldings = await Promise.all(
    portfoliosWithTransactions.map(async (portfolio) =>
      addPlaidHoldings(portfolio, holdings),
    ),
  );

  return portfolioWithHoldings as Portfolio[];
};
