import { Portfolio } from '@/db/entities';
import {
  InvestmentsHoldingsGetResponse,
  InvestmentsTransactionsGetResponse,
} from 'plaid';

type PopulatedData = {
  security?: InvestmentsHoldingsGetResponse['securities'][0];
  account?: InvestmentsHoldingsGetResponse['accounts'][0];
};
export type FlatHolding = InvestmentsHoldingsGetResponse['holdings'][0] &
  PopulatedData;

export type FlatTransaction = InvestmentsTransactionsGetResponse['investment_transactions'][0] &
  PopulatedData;

type PortfolioWithoutOwner = Omit<
  Portfolio,
  'owner' | '_id' | 'description' | 'totalValue'
>;
export type BasicPortfolio = Omit<
  PortfolioWithoutOwner,
  'holdings' | 'transactions'
> &
  Required<{ plaid: Portfolio['plaid'] }>;
