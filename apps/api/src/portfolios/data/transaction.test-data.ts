import { NET, TSLA } from '~/securities';
import { InvestmentTransactionSubtype, InvestmentTransactionType } from 'plaid';
import { Transaction } from '../entities';

export const ImportedTransactions: Transaction[] = [
  {
    name: 'DEPOSIT $100',
    date: new Date(2022, 2, 4),
    amount: 100,
    currency: 'USD',
    type: InvestmentTransactionType.Cash,
    subType: InvestmentTransactionSubtype.Deposit,
  },
  {
    name: 'BUY Tesla Inc.',
    currency: 'USD',
    date: new Date(2022, 2, 3),
    price: 1,
    amount: 10,
    quantity: 10,
    plaidTransactionId: 'test',
    subType: InvestmentTransactionSubtype.Buy,
    security: TSLA._id,
    type: InvestmentTransactionType.Buy,
  },
  {
    name: 'Sell Tesla Inc.',
    date: new Date(2022, 2, 4),
    currency: 'USD',
    price: 3,
    quantity: -5,
    amount: -15,
    plaidTransactionId: 'test',
    subType: InvestmentTransactionSubtype.Sell,
    security: TSLA._id,
    type: InvestmentTransactionType.Sell,
  },
  {
    name: 'BUY NET.',
    currency: 'USD',
    date: new Date(2022, 3, 3),
    price: 10,
    quantity: 1,
    amount: 10,
    plaidTransactionId: 'test',
    subType: InvestmentTransactionSubtype.Buy,
    security: NET._id,
    type: InvestmentTransactionType.Buy,
  },
  {
    name: 'DEPOSIT $5000',
    amount: 5000,
    currency: 'USD',
    date: new Date(2022, 3, 4),
    type: InvestmentTransactionType.Cash,
    subType: InvestmentTransactionSubtype.Deposit,
  },
  {
    name: 'BUY NET.',
    currency: 'USD',
    date: new Date(2022, 3, 5),
    price: 100,
    quantity: 10,
    amount: 1000,
    plaidTransactionId: 'test',
    subType: InvestmentTransactionSubtype.Buy,
    security: NET._id,
    type: InvestmentTransactionType.Buy,
  },
  {
    name: 'WITHDRAW $2000',
    amount: -2000,
    currency: 'USD',
    date: new Date(2022, 3, 6),
    type: InvestmentTransactionType.Cash,
    subType: InvestmentTransactionSubtype.Withdrawal,
  },
];

// TODO: come back here when we know how shorts should look
export const ShortSellingTransactions: Transaction[] = [];
