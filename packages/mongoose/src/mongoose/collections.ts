import { Schema } from 'mongoose';
import { IPortfolio, IPosition, IQuote, ISymbol } from './interfaces';
import { defineCollection } from './util';

export const Portfolio = defineCollection<IPortfolio>({
  name: `Portfolio`,
  schemaDefinition: {
    owner: String,
    private: {
      type: `Boolean`,
      defaul: false,
    },
    name: {
      type: `String`,
    },
    description: {
      type: `String`,
    },
    cash: {
      type: `Number`,
      default: 0.0,
    },
    totalValue: {
      type: `Number`,
      default: 0.0,
    },
    numberOfPositions: {
      type: `Number`,
      default: 0,
    },
    positions: [{ type: Schema.Types.ObjectId, ref: `Position` }],
  },
});

export const Symbol = defineCollection<ISymbol>({
  name: `Symbol`,
  schemaDefinition: {
    symbol: String,
    securityName: String,
    isEtf: {
      type: `Boolean`,
      defaul: false,
    },
    exchange: String,
    country: String,
    quote: { type: Schema.Types.ObjectId, ref: `Quote` },
  },
});

export const Quotes = defineCollection<IQuote>({
  name: `Quote`,
  schemaDefinition: {
    symbol: { type: Schema.Types.ObjectId, ref: `Symbol` },
    change: {
      type: `Number`,
      default: 0.0,
    },
    changePercent: {
      type: `Number`,
      default: 0.0,
    },
    latestPrice: {
      type: `Number`,
      default: 0.0,
    },
    latestUpdate: {
      type: `Number`,
      default: 0,
    },
    extendedPrice: {
      type: `Number`,
      default: 0.0,
    },
    extendedUpdate: {
      type: `Number`,
      default: 0,
    },
    volume: {
      type: `Number`,
      default: 0,
    },
    companyName: String,
    primaryExchange: String,
    calculationPrice: String,
    open: { type: `Number`, default: 0.0 },
    openTime: { type: `Number`, default: 0.0 },
    openSource: String,
    close: { type: `Number`, default: 0.0 },
    closeTime: { type: `Number`, default: 0.0 },
    closeSource: String,
    high: { type: `Number`, default: 0.0 },
    highTime: { type: `Number`, default: 0.0 },
    highSource: String,
    low: { type: `Number`, default: 0.0 },
    lowTime: { type: `Number`, default: 0.0 },
    lowSource: String,
    latestSource: String,
    latestTime: String,
    latestVolume: { type: `Number`, default: 0.0 },
    iexRealtimePrice: { type: `Number`, default: 0.0 },
    iexRealtimeSize: { type: `Number`, default: 0.0 },
    iexLastUpdated: { type: `Number`, default: 0.0 },
    delayedPrice: { type: `Number`, default: 0.0 },
    delayedPriceTime: { type: `Number`, default: 0.0 },
    oddLotDelayedPrice: { type: `Number`, default: 0.0 },
    oddLotDelayedPriceTime: { type: `Number`, default: 0.0 },
    extendedChange: { type: `Number`, default: 0.0 },
    extendedChangePercent: { type: `Number`, default: 0.0 },
    extendedPriceTime: { type: `Number`, default: 0.0 },
    previousClose: { type: `Number`, default: 0.0 },
    previousVolume: { type: `Number`, default: 0.0 },
    iexMarketPercent: { type: `Number`, default: 0.0 },
    iexVolume: { type: `Number`, default: 0.0 },
    avgTotalVolume: { type: `Number`, default: 0.0 },
    iexBidPrice: { type: `Number`, default: 0.0 },
    iexBidSize: { type: `Number`, default: 0.0 },
    iexAskPrice: { type: `Number`, default: 0.0 },
    iexAskSize: { type: `Number`, default: 0.0 },
    iexOpen: { type: `Number`, default: 0.0 },
    iexOpenTime: { type: `Number`, default: 0.0 },
    iexClose: { type: `Number`, default: 0.0 },
    iexCloseTime: { type: `Number`, default: 0.0 },
    marketCap: { type: `Number`, default: 0.0 },
    peRatio: { type: `Number`, default: 0.0 },
    week52High: { type: `Number`, default: 0.0 },
    week52Low: { type: `Number`, default: 0.0 },
    ytdChange: { type: `Number`, default: 0.0 },
    lastTradeTime: { type: `Number`, default: 0.0 },
    isUSMarketOpen: Boolean,
  },
});

export const Position = defineCollection<IPosition>({
  name: `Position`,
  schemaDefinition: {
    owner: String,
    portfolio: { type: Schema.Types.ObjectId, ref: `Portfolio` },
    symbol: { type: Schema.Types.ObjectId, ref: `Symbol` },
    direction: { type: String, enum: [`long`, `short`], default: `long` },
    exposure: {
      type: `Number`,
      default: 0,
    },
    averagePrice: {
      type: `Number`,
      default: 0,
    },
    marketValue: {
      type: `Number`,
      default: 0,
    },
    costBasis: {
      type: `Number`,
      default: 0,
    },
    brokerFees: {
      type: `Number`,
      default: 0,
    },
    positionSize: {
      type: `Number`,
      default: 0,
    },
    profitLossUsd: {
      type: `Number`,
      default: 0,
    },
    profitLossPercent: {
      type: `Number`,
      default: 0,
    },
    dailyProfitLossUsd: {
      type: `Number`,
      default: 0,
    },
    openDate: {
      type: `Date`,
      default: new Date(),
    },
    closeDate: {
      type: `Date`,
      default: new Date(),
    },
  },
});
