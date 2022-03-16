import { AccessClaim } from '@/types/AccessClaim';
import {
  InvestmentsHoldingsGetResponse,
  InvestmentsTransactionsGetResponse,
} from 'plaid';
import { Portfolio } from '../entities';

type PopulatedData = {
  security?: InvestmentsHoldingsGetResponse['securities'][0];
  account?: InvestmentsHoldingsGetResponse['accounts'][0];
};
export type FlatHolding = InvestmentsHoldingsGetResponse['holdings'][0] &
  PopulatedData;

export type FlatTransaction = InvestmentsTransactionsGetResponse['investment_transactions'][0] &
  PopulatedData;

export const flattenTransactions = (
  input: InvestmentsTransactionsGetResponse,
): FlatTransaction[] => {
  return input.investment_transactions.map((transaction) => ({
    ...transaction,
    account: input.accounts.find(
      (acc) => acc.account_id === transaction.account_id,
    ),
    security: input.securities.find(
      (sec) => sec.security_id === transaction.security_id,
    ),
  }));
};

export const flattenHoldings = (
  input: InvestmentsHoldingsGetResponse,
): FlatHolding[] => {
  return input.holdings.map((holding) => ({
    ...holding,
    account: input.accounts.find(
      (acc) => acc.account_id === holding.account_id,
    ),
    security: input.securities.find(
      (sec) => sec.security_id === holding.security_id,
    ),
  }));
};

export const addOpenPosition = (holding: FlatHolding) => {};

export const mapPlaidDataToPortfolios = (
  holdings: InvestmentsHoldingsGetResponse,
  transcations: InvestmentsTransactionsGetResponse,
): Portfolio[] => {
  // TODO: add support for all securities eventually
  const equityOnly = (transaction) => transaction.security?.type === `equity`;
  const allTransactions = flattenTransactions(transcations).filter(equityOnly);
  const allHoldings = flattenHoldings(holdings).filter(equityOnly);

  const accounts = holdings.accounts.filter(
    (account) => account.type === `investment`,
  );

  const portfolios: Partial<Portfolio>[] = accounts.map((account) => ({
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
