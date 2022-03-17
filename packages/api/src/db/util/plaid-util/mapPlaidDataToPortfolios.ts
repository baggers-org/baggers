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
  return Promise.all(
    getBasicPortfolios(holdings)
      .map((portfolio) => addPlaidTransactions(portfolio, transcations))
      .filter((p) => p.transactions.length)
      .map(async (portfolio) => addPlaidHoldings(portfolio, holdings)) as any,
  );
};
