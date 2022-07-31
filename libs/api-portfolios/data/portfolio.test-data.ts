import { Ticker2, Ticker1, Tickers } from '@baggers/api-tickers';
import { User1, User2 } from '@baggers/api-users';
import mongoose from 'mongoose';
import { PortfolioFromDb, PopulatedPortfolio } from '../src/lib/entities';
import { HoldingDirection, HoldingType, HoldingSource } from '../src/lib/enums';

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
      ticker: Ticker2._id,
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
      ticker: Ticker1._id,
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
      ticker: Ticker2._id,
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
      ticker: Ticker1._id,
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
      ticker: Ticker2._id,
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
      ticker: Ticker1._id,
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
      ticker: Tickers.find((t) => t._id === holding.ticker),
    })),
  };
};

export const Portfolios = [
  Portfolio1,
  PublicPortfolio,
  PortfolioWithNoHoldings,
];
