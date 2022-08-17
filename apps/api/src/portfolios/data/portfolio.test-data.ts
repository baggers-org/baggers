import {
  TSLA,
  A,
  Securities,
  ImportedDBLTX,
  ImportedSBSI,
  SBSI,
} from '~/securities';
import { User1, User2 } from '~/users';
import mongoose from 'mongoose';
import { ImportedTransactions } from './transaction.test-data';
import { PortfolioFromDb, PopulatedPortfolio } from '../entities';
import { HoldingDirection, HoldingType, HoldingSource } from '../enums';
import { ObjectId } from '~/shared';
import { AccountType } from 'plaid';

export const Portfolio1: PortfolioFromDb = {
  _id: new mongoose.Types.ObjectId('62d2cd45c63873e235c99532'),
  owner: User1._id,
  private: true,
  name: 'Wells Fargo - Plaid isa',
  description: '',
  createdAt: new Date('01/01/01'),
  updatedAt: new Date('07/22/22'),
  cash: 1239.32,
  holdings: [
    {
      security: TSLA._id,
      averagePrice: 383.9,
      costBasis: 3839,
      currency: 'USD',
      brokerFees: 0,
      direction: HoldingDirection.long,
      quantity: 10,
      type: HoldingType.shares,
      source: HoldingSource.broker,
    },
    {
      security: A._id,
      averagePrice: 4794.2,
      costBasis: 47942,
      currency: 'USD',
      brokerFees: 0,
      direction: HoldingDirection.long,
      quantity: 10,
      type: HoldingType.shares,
      source: HoldingSource.broker,
    },
    {
      security: TSLA._id,
      averagePrice: 78.71725949878739,
      costBasis: 389493,
      currency: 'USD',
      brokerFees: 0,
      direction: HoldingDirection.short,
      quantity: 4948,
      type: HoldingType.shares,
      source: HoldingSource.broker,
    },
    {
      security: A._id,
      averagePrice: 9042.763533674339,
      costBasis: 84857293,
      currency: 'USD',
      brokerFees: 0,
      direction: HoldingDirection.long,
      quantity: 9384,
      type: HoldingType.shares,
      source: HoldingSource.broker,
    },
  ],
  transactions: [],
};

export const ImportedPortfolio: PortfolioFromDb = {
  ...Portfolio1,
  _id: new ObjectId('62d2cd45c63873e235c99535'),
  name: 'Imported Portfolio Test',
  plaidAccountType: AccountType.Investment,
  holdings: [
    {
      averagePrice: 10,
      costBasis: 100,
      quantity: 10,
      institutionValue: 432,
      source: HoldingSource.broker,
      importedSecurity: ImportedDBLTX,
    },
    {
      averagePrice: 409,
      costBasis: 49,
      quantity: 50,
      institutionValue: 52300,
      source: HoldingSource.broker,
      // This one can be linked
      security: SBSI._id,
      importedSecurity: ImportedSBSI,
    },
    // And some matched holdings, just for testing purposes as it should support both
    {
      averagePrice: 1000,
      costBasis: 42,
      quantity: 20,
      source: HoldingSource.broker,
      security: TSLA._id,
    },
  ],
};

export const PortfolioWithTransactions: PortfolioFromDb = {
  _id: new mongoose.Types.ObjectId('62d31f1dc63873e235c99548'),
  owner: User1._id,
  private: false,
  createdAt: new Date('21/01/2021'),
  updatedAt: new Date('09/08/2022'),
  name: 'Vanguard - Plaid isa',
  description: '',
  cash: 0,
  holdings: [],
  transactions: ImportedTransactions,
};

export const PublicPortfolio: PortfolioFromDb = {
  _id: new mongoose.Types.ObjectId('62d31f1dc63873e235c99546'),
  owner: User2._id,
  private: false,
  createdAt: new Date('21/01/2021'),
  updatedAt: new Date('09/08/2022'),
  name: 'Vanguard - Plaid isa',
  description: '',
  cash: 230495.33,
  holdings: [
    {
      security: TSLA._id,
      averagePrice: 383.9,
      costBasis: 3839,
      currency: 'USD',
      brokerFees: 0,
      direction: HoldingDirection.long,
      quantity: 10,
      type: HoldingType.shares,
      source: HoldingSource.direct,
    },
    {
      security: A._id,
      averagePrice: 4794.2,
      costBasis: 47942,
      currency: 'USD',
      brokerFees: 0,
      direction: HoldingDirection.long,
      quantity: 10,
      type: HoldingType.shares,
      source: HoldingSource.direct,
    },
  ],
  transactions: [],
};
export const PortfolioWithNoHoldings: PortfolioFromDb = {
  ...PublicPortfolio,
  _id: new mongoose.Types.ObjectId('62d31f1dc63873e235c99542'),

  updatedAt: new Date('12/12/2022'),
  owner: User1._id,
  holdings: [],
  transactions: [],
};

export const getPopulated = (
  portfolio: PortfolioFromDb
): PopulatedPortfolio => {
  return {
    ...portfolio,
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
