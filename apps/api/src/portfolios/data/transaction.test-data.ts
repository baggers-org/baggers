import { NET, TSLA } from '~/securities';
import {
  InvestmentTransactionSubtype,
  InvestmentTransactionType,
} from 'plaid';
import { Transaction } from '../entities';
import { AssetClass } from '~/securities/enums/asset-class.enum';
import { ObjectId } from '~/shared';

export const ImportedTransactions: Transaction[] = [
  {
    _id: new ObjectId('62d2cd45c63873e235c99531'),
    name: 'DEPOSIT $100',
    date: new Date(2022, 2, 1),
    amount: 100,
    currency: 'USD',
    type: InvestmentTransactionType.Cash,
    quantity: 100,
    assetClass: AssetClass.cash,
    fees: 0,
    subType: InvestmentTransactionSubtype.Deposit,
  },
  {
    _id: new ObjectId('62d2cd45c63873e235c99532'),
    name: 'BUY Tesla Inc.',
    currency: 'USD',
    date: new Date(2022, 2, 3),
    price: 1,
    amount: 10,
    quantity: 10,
    plaidTransactionId: 'test',
    subType: InvestmentTransactionSubtype.Buy,
    fees: 0,
    security: TSLA._id,
    assetClass: AssetClass.stock,
    type: InvestmentTransactionType.Buy,
  },
  {
    _id: new ObjectId('62d2cd45c63873e235c99533'),
    name: 'Sell Tesla Inc.',
    date: new Date(2022, 2, 4),
    currency: 'USD',
    fees: 0,
    price: 3,
    quantity: -5,
    amount: -15,
    plaidTransactionId: 'test',
    subType: InvestmentTransactionSubtype.Sell,
    assetClass: AssetClass.stock,
    security: TSLA._id,
    type: InvestmentTransactionType.Sell,
  },
  {
    _id: new ObjectId('62d2cd45c63873e235c99534'),
    name: 'BUY NET.',
    currency: 'USD',
    fees: 0,
    date: new Date(2022, 3, 3),
    price: 10,
    quantity: 1,
    amount: 10,
    plaidTransactionId: 'test',
    subType: InvestmentTransactionSubtype.Buy,
    security: NET._id,
    assetClass: AssetClass.stock,
    type: InvestmentTransactionType.Buy,
  },
  {
    _id: new ObjectId('62d2cd45c63873e235c99535'),
    name: 'DEPOSIT $5000',
    amount: 5000,
    currency: 'USD',
    fees: 0,
    quantity: 0,
    date: new Date(2022, 3, 4),
    type: InvestmentTransactionType.Cash,
    assetClass: AssetClass.stock,
    subType: InvestmentTransactionSubtype.Deposit,
  },
  {
    _id: new ObjectId('62d2cd45c63873e235c99536'),
    name: 'BUY NET.',
    currency: 'USD',
    date: new Date(2022, 3, 5),
    fees: 0,
    price: 100,
    quantity: 10,
    amount: 1000,
    plaidTransactionId: 'test',
    subType: InvestmentTransactionSubtype.Buy,
    security: NET._id,
    assetClass: AssetClass.stock,
    type: InvestmentTransactionType.Buy,
  },
  {
    _id: new ObjectId('62d2cd45c63873e235c99537'),
    name: 'WITHDRAW $2000',
    amount: -2000,
    assetClass: AssetClass.cash,
    quantity: 0,
    currency: 'USD',
    date: new Date(2022, 3, 6),
    type: InvestmentTransactionType.Cash,
    fees: 0,
    subType: InvestmentTransactionSubtype.Withdrawal,
  },
];
