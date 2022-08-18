import { Securities } from '~/securities';
import { User1, User2 } from '~/users';
import mongoose from 'mongoose';
import { ImportedTransactions } from './transaction.test-data';
import { PopulatedPortfolio, Portfolio } from '../entities';
import { ObjectId } from '~/shared';
import { Holdings1, ImportedHoldings } from './holding.test-data';
import { PlaidAccountType } from '../enums';
import { PlaidAccountSubtype } from '~/plaid-items/enums/plaid-account-subtype.enum';

export const Portfolio1: Portfolio = {
  _id: new mongoose.Types.ObjectId('62d2cd45c63873e235c99532'),
  owner: User1._id,
  private: true,
  name: 'Wells Fargo - Plaid isa',
  description: '',
  createdAt: new Date('01/01/01'),
  updatedAt: new Date('07/22/22'),
  holdings: Holdings1,
  transactions: [],
};

export const ImportedPortfolio: Portfolio = {
  ...Portfolio1,
  _id: new ObjectId('62d2cd45c63873e235c99535'),
  name: 'Imported Portfolio Test',
  plaidAccount: {
    account_id: 'test',
    balances: {
      available: 100,
      current: 20,
      iso_currency_code: 'USD',
    },
    type: PlaidAccountType.investment,
    subtype: PlaidAccountSubtype._401k,
  },
  holdings: ImportedHoldings,
};

export const PortfolioWithTransactions: Portfolio = {
  _id: new mongoose.Types.ObjectId('62d31f1dc63873e235c99548'),
  owner: User1._id,
  private: false,
  createdAt: new Date('21/01/2021'),
  updatedAt: new Date('09/08/2022'),
  name: 'Vanguard - Plaid isa',
  description: '',
  holdings: [],
  transactions: ImportedTransactions,
};

export const PublicPortfolio: Portfolio = {
  ...Portfolio1,
  _id: new mongoose.Types.ObjectId('62d31f1dc63873e235c99546'),
  owner: User2._id,
  private: false,
  createdAt: new Date('21/01/2021'),
  updatedAt: new Date('09/08/2022'),
  name: 'Vanguard - Plaid isa',
  description: '',
  transactions: [],
};
export const PortfolioWithNoHoldings: Portfolio = {
  ...PublicPortfolio,
  _id: new mongoose.Types.ObjectId('62d31f1dc63873e235c99542'),

  updatedAt: new Date('12/12/2022'),
  owner: User1._id,
  holdings: [],
  transactions: [],
};

export const getPopulated = (portfolio: Portfolio): PopulatedPortfolio => {
  return {
    ...portfolio,
    transactions: portfolio.transactions.map((tran) => ({
      ...tran,
      security: Securities.find((t) => t._id === tran.security),
    })),
    holdings: portfolio.holdings.map((holding) => ({
      ...holding,
      security: Securities.find((t) => t._id === holding.security),
    })),
  };
};

export const Portfolios = [
  Portfolio1,
  PublicPortfolio,
  PortfolioWithNoHoldings,
  ImportedPortfolio,
];
