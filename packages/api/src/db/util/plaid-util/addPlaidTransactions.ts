import { Portfolio } from '@/db/entities';
import { TransactionType, TransactionSubtype } from '@/db/entities/transaction';
import { InvestmentsTransactionsGetResponse } from 'plaid';
import { equityOnly } from './equityOnly';
import { flattenTransactions } from './flatten';
import { BasicPortfolio } from './types';

/**
 *
 * Gets a list of transactions ready for the DB
 */
export const addPlaidTransactions = (
  forPortfolio: BasicPortfolio,
  transactions: InvestmentsTransactionsGetResponse,
): BasicPortfolio & { transactions: Portfolio['transactions'] } => {
  const equityTransactions = flattenTransactions(transactions).filter(
    equityOnly,
  );

  const finalTransactions = equityTransactions
    .filter((tran) => tran.account_id === forPortfolio?.plaid?.linkedAccountId)
    .map((tran) => {
      const {
        name,
        price,
        quantity,
        date,
        iso_currency_code: currency,
        type,
        subtype: subType,
      } = tran;
      return {
        name,
        price,
        quantity,
        currency: currency || `USD`,
        type: (type as unknown) as TransactionType,
        date: new Date(date),
        subType: (subType as unknown) as TransactionSubtype,
      };
    });

  return {
    ...forPortfolio,
    transactions: finalTransactions,
  };
};
