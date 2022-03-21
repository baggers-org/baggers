import {
  InvestmentsTransactionsGetResponse,
  InvestmentsHoldingsGetResponse,
} from 'plaid';
import { FlatTransaction, FlatHolding } from './types';

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
