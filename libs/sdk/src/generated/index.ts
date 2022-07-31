import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** Mongo object id scalar type */
  ObjectId: any;
};

export type CreateUserInput = {
  _id: Scalars['String'];
  displayName: Scalars['String'];
  emails: Array<Scalars['String']>;
  photos: Array<Scalars['String']>;
};

export type Holding = {
  __typename?: 'Holding';
  averagePrice: Scalars['Float'];
  brokerFees?: Maybe<Scalars['Float']>;
  costBasis: Scalars['Float'];
  currency?: Maybe<Scalars['String']>;
  dailyProfitLossUsd: Scalars['Float'];
  direction?: Maybe<HoldingDirection>;
  exposure: Scalars['Float'];
  marketValue: Scalars['Float'];
  profitLossPercent: Scalars['Float'];
  profitLossUsd: Scalars['Float'];
  quantity: Scalars['Float'];
  source: HoldingSource;
  ticker: Ticker;
  type: HoldingType;
};

export enum HoldingDirection {
  Long = 'long',
  Short = 'short'
}

export enum HoldingSource {
  Broker = 'broker',
  Direct = 'direct',
  Transactions = 'transactions'
}

export enum HoldingType {
  Calls = 'calls',
  Puts = 'puts',
  Shares = 'shares'
}

export type HoldingWithoutMarketData = {
  __typename?: 'HoldingWithoutMarketData';
  averagePrice: Scalars['Float'];
  brokerFees?: Maybe<Scalars['Float']>;
  costBasis: Scalars['Float'];
  currency?: Maybe<Scalars['String']>;
  direction?: Maybe<HoldingDirection>;
  quantity: Scalars['Float'];
  source: HoldingSource;
  ticker: Ticker;
  type: HoldingType;
};

export type Mutation = {
  __typename?: 'Mutation';
  portfoliosInitEmpty: RecordId;
  portfoliosRemoveMultiple: RemoveMultipleResponse;
  portfoliosRemoveOne: RecordId;
  portfoliosUpdateOne: PortfolioWithoutMarketData;
  usersFindOrCreate: User;
  usersRemoveOne: User;
  usersUpdateOne: User;
};


export type MutationPortfoliosRemoveMultipleArgs = {
  _ids: Array<Scalars['ObjectId']>;
};


export type MutationPortfoliosRemoveOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationPortfoliosUpdateOneArgs = {
  _id: Scalars['ObjectId'];
  input: UpdatePortfolioInput;
};


export type MutationUsersFindOrCreateArgs = {
  input: CreateUserInput;
};


export type MutationUsersRemoveOneArgs = {
  _id: Scalars['ID'];
};


export type MutationUsersUpdateOneArgs = {
  input: UpdateUserInput;
};

export type PopulatedHolding = {
  __typename?: 'PopulatedHolding';
  averagePrice: Scalars['Float'];
  brokerFees?: Maybe<Scalars['Float']>;
  costBasis: Scalars['Float'];
  currency?: Maybe<Scalars['String']>;
  direction?: Maybe<HoldingDirection>;
  quantity: Scalars['Float'];
  source: HoldingSource;
  ticker: Ticker;
  type: HoldingType;
};

export type Portfolio = {
  __typename?: 'Portfolio';
  _id: Scalars['ObjectId'];
  cash: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  holdings: Array<Holding>;
  name: Scalars['String'];
  owner: User;
  private: Scalars['Boolean'];
  totalValue: Scalars['Float'];
  transactions: Array<Transaction>;
  updatedAt: Scalars['DateTime'];
};

export type PortfolioSummary = {
  __typename?: 'PortfolioSummary';
  _id: Scalars['ObjectId'];
  cash: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  name: Scalars['String'];
  owner: User;
  private: Scalars['Boolean'];
  top5Holdings: Array<Holding>;
  totalValue: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

/**
 *
 * # Test
 *
 */
export type PortfolioWithoutMarketData = {
  __typename?: 'PortfolioWithoutMarketData';
  _id: Scalars['ObjectId'];
  cash: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  holdings: Array<HoldingWithoutMarketData>;
  name: Scalars['String'];
  owner: User;
  private: Scalars['Boolean'];
  transactions: Array<Transaction>;
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  portfoliosCreated: Array<PortfolioSummary>;
  portfoliosFindById: Portfolio;
  tickersFindById: Ticker;
  tickersSearch: Array<Ticker>;
  usersFindById: User;
};


export type QueryPortfoliosFindByIdArgs = {
  _id: Scalars['ObjectId'];
};


export type QueryTickersFindByIdArgs = {
  _id: Scalars['ObjectId'];
};


export type QueryTickersSearchArgs = {
  searchTerm: Scalars['String'];
};


export type QueryUsersFindByIdArgs = {
  _id: Scalars['ID'];
};

export type Quote = {
  __typename?: 'Quote';
  avgTotalVolume?: Maybe<Scalars['Float']>;
  calculationPrice?: Maybe<Scalars['String']>;
  change?: Maybe<Scalars['Float']>;
  changePercent?: Maybe<Scalars['Float']>;
  close?: Maybe<Scalars['Float']>;
  closeSource?: Maybe<Scalars['String']>;
  closeTime?: Maybe<Scalars['Float']>;
  companyName: Scalars['String'];
  currency?: Maybe<Scalars['String']>;
  delayedPrice?: Maybe<Scalars['Float']>;
  delayedPriceTime?: Maybe<Scalars['Float']>;
  extendedChange?: Maybe<Scalars['Float']>;
  extendedChangePercent?: Maybe<Scalars['Float']>;
  extendedPrice?: Maybe<Scalars['Float']>;
  extendedPriceTime?: Maybe<Scalars['Float']>;
  high?: Maybe<Scalars['Float']>;
  highSource?: Maybe<Scalars['String']>;
  highTime?: Maybe<Scalars['Float']>;
  iexAskPrice?: Maybe<Scalars['Float']>;
  iexAskSize?: Maybe<Scalars['Float']>;
  iexBidPrice?: Maybe<Scalars['Float']>;
  iexBidSize?: Maybe<Scalars['Float']>;
  iexClose?: Maybe<Scalars['Float']>;
  iexCloseTime?: Maybe<Scalars['Float']>;
  iexLastUpdated?: Maybe<Scalars['Float']>;
  iexMarketPercent?: Maybe<Scalars['Float']>;
  iexOpen?: Maybe<Scalars['Float']>;
  iexOpenTime?: Maybe<Scalars['Float']>;
  iexRealtimePrice?: Maybe<Scalars['Float']>;
  iexRealtimeSize?: Maybe<Scalars['Float']>;
  iexVolume?: Maybe<Scalars['Float']>;
  isUSMarketOpen?: Maybe<Scalars['Boolean']>;
  lastTradeTime?: Maybe<Scalars['Float']>;
  latestPrice?: Maybe<Scalars['Float']>;
  latestSource?: Maybe<Scalars['String']>;
  latestTime?: Maybe<Scalars['String']>;
  latestUpdate?: Maybe<Scalars['Float']>;
  latestVolume?: Maybe<Scalars['Float']>;
  low?: Maybe<Scalars['Float']>;
  lowSource?: Maybe<Scalars['String']>;
  lowTime?: Maybe<Scalars['Float']>;
  marketCap?: Maybe<Scalars['Float']>;
  oddLotDelayedPrice?: Maybe<Scalars['Float']>;
  oddLotDelayedPriceTime?: Maybe<Scalars['Float']>;
  open?: Maybe<Scalars['Float']>;
  openSource?: Maybe<Scalars['String']>;
  openTime?: Maybe<Scalars['Float']>;
  peRatio?: Maybe<Scalars['Float']>;
  previousClose?: Maybe<Scalars['Float']>;
  previousVolume?: Maybe<Scalars['Float']>;
  primaryExchange?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  volume?: Maybe<Scalars['Float']>;
  week52High?: Maybe<Scalars['Float']>;
  week52Low?: Maybe<Scalars['Float']>;
  ytdChange?: Maybe<Scalars['Float']>;
};

export type RecordId = {
  __typename?: 'RecordId';
  _id: Scalars['String'];
};

export type RemoveMultipleResponse = {
  __typename?: 'RemoveMultipleResponse';
  acknowledged: Scalars['Boolean'];
  deletedCount: Scalars['Float'];
};

export type Ticker = {
  __typename?: 'Ticker';
  _id: Scalars['ObjectId'];
  cik?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  currency: Scalars['String'];
  exchange: Scalars['String'];
  exchangeName: Scalars['String'];
  figi?: Maybe<Scalars['String']>;
  iexId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  quote?: Maybe<Quote>;
  region: Scalars['String'];
  symbol: Scalars['String'];
  symbolType: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Transaction = {
  __typename?: 'Transaction';
  currency: Scalars['String'];
  date: Scalars['DateTime'];
  name: Scalars['String'];
  price: Scalars['Float'];
  quantity: Scalars['Float'];
  subType: TransactionSubtype;
  type: TransactionType;
};

export enum TransactionSubtype {
  AccountFee = 'AccountFee',
  Adjustment = 'Adjustment',
  Assignment = 'Assignment',
  Buy = 'Buy',
  BuyToCover = 'BuyToCover',
  Contribution = 'Contribution',
  Deposit = 'Deposit',
  Distribution = 'Distribution',
  Dividend = 'Dividend',
  DividendReinvestment = 'DividendReinvestment',
  Exercise = 'Exercise',
  Expire = 'Expire',
  FundFee = 'FundFee',
  Interest = 'Interest',
  InterestReceivable = 'InterestReceivable',
  InterestReinvestment = 'InterestReinvestment',
  LegalFee = 'LegalFee',
  LoanPayment = 'LoanPayment',
  LongTermCapitalGain = 'LongTermCapitalGain',
  LongTermCapitalGainReinvestment = 'LongTermCapitalGainReinvestment',
  ManagementFee = 'ManagementFee',
  MarginExpense = 'MarginExpense',
  Merger = 'Merger',
  MiscellaneousFee = 'MiscellaneousFee',
  NonQualifiedDividend = 'NonQualifiedDividend',
  NonResidentTax = 'NonResidentTax',
  PendingCredit = 'PendingCredit',
  PendingDebit = 'PendingDebit',
  QualifiedDividend = 'QualifiedDividend',
  Rebalance = 'Rebalance',
  ReturnOfPrincipal = 'ReturnOfPrincipal',
  Sell = 'Sell',
  SellShort = 'SellShort',
  ShortTermCapitalGain = 'ShortTermCapitalGain',
  ShortTermCapitalGainReinvestment = 'ShortTermCapitalGainReinvestment',
  SpinOff = 'SpinOff',
  Split = 'Split',
  StockDistribution = 'StockDistribution',
  Tax = 'Tax',
  TaxWithheld = 'TaxWithheld',
  Transfer = 'Transfer',
  TransferFee = 'TransferFee',
  TrustFee = 'TrustFee',
  UnqualifiedGain = 'UnqualifiedGain',
  Withdrawal = 'Withdrawal'
}

export enum TransactionType {
  Buy = 'Buy',
  Cancel = 'Cancel',
  Cash = 'Cash',
  Fee = 'Fee',
  Sell = 'Sell',
  Transfer = 'Transfer'
}

export type UpdatePortfolioInput = {
  cash?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  private?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateUserInput = {
  _id?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  emails?: InputMaybe<Array<Scalars['String']>>;
  id: Scalars['Int'];
  photos?: InputMaybe<Array<Scalars['String']>>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  displayName: Scalars['String'];
  emails?: Maybe<Array<Scalars['String']>>;
  photos: Array<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type AllHoldingDataFragment = { __typename?: 'Holding', marketValue: number, exposure: number, profitLossUsd: number, profitLossPercent: number, dailyProfitLossUsd: number, averagePrice: number, costBasis: number, brokerFees?: number | null, direction?: HoldingDirection | null, quantity: number, type: HoldingType, source: HoldingSource, currency?: string | null, ticker: { __typename?: 'Ticker', _id: any, name: string, symbol: string, symbolType: string, exchange: string, currency: string, exchangeName: string, region: string, quote?: { __typename?: 'Quote', avgTotalVolume?: number | null, calculationPrice?: string | null, change?: number | null, changePercent?: number | null, companyName: string, close?: number | null, closeSource?: string | null, closeTime?: number | null, currency?: string | null, delayedPrice?: number | null, delayedPriceTime?: number | null, extendedPrice?: number | null, extendedChange?: number | null, extendedChangePercent?: number | null, extendedPriceTime?: number | null, high?: number | null, highSource?: string | null, highTime?: number | null, iexAskPrice?: number | null, iexAskSize?: number | null, iexBidPrice?: number | null, iexBidSize?: number | null, iexClose?: number | null, iexCloseTime?: number | null, iexLastUpdated?: number | null, iexOpen?: number | null, iexOpenTime?: number | null, iexRealtimePrice?: number | null, iexRealtimeSize?: number | null, iexMarketPercent?: number | null, iexVolume?: number | null, isUSMarketOpen?: boolean | null, lastTradeTime?: number | null, latestPrice?: number | null, latestSource?: string | null, latestTime?: string | null, latestUpdate?: number | null, latestVolume?: number | null, low?: number | null, lowTime?: number | null, lowSource?: string | null, marketCap?: number | null, oddLotDelayedPrice?: number | null, oddLotDelayedPriceTime?: number | null, open?: number | null, openSource?: string | null, openTime?: number | null, peRatio?: number | null, previousClose?: number | null, previousVolume?: number | null, primaryExchange?: string | null, symbol?: string | null, week52High?: number | null, week52Low?: number | null, volume?: number | null, ytdChange?: number | null } | null } };

export type PortfolioSummaryFragment = { __typename?: 'Portfolio', _id: any, cash: number, name: string, description: string, private: boolean, createdAt: any, updatedAt: any, totalValue: number, owner: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string>, createdAt: any, updatedAt: any } };

export type PortfolioTransactionsFragment = { __typename?: 'Portfolio', transactions: Array<{ __typename?: 'Transaction', name: string, date: any, currency: string, quantity: number, price: number, type: TransactionType, subType: TransactionSubtype }> };

export type PortfolioHoldingsFragment = { __typename?: 'Portfolio', holdings: Array<{ __typename?: 'Holding', marketValue: number, exposure: number, profitLossUsd: number, profitLossPercent: number, dailyProfitLossUsd: number, averagePrice: number, costBasis: number, brokerFees?: number | null, direction?: HoldingDirection | null, quantity: number, type: HoldingType, source: HoldingSource, currency?: string | null, ticker: { __typename?: 'Ticker', _id: any, name: string, symbol: string, symbolType: string, exchange: string, currency: string, exchangeName: string, region: string, quote?: { __typename?: 'Quote', avgTotalVolume?: number | null, calculationPrice?: string | null, change?: number | null, changePercent?: number | null, companyName: string, close?: number | null, closeSource?: string | null, closeTime?: number | null, currency?: string | null, delayedPrice?: number | null, delayedPriceTime?: number | null, extendedPrice?: number | null, extendedChange?: number | null, extendedChangePercent?: number | null, extendedPriceTime?: number | null, high?: number | null, highSource?: string | null, highTime?: number | null, iexAskPrice?: number | null, iexAskSize?: number | null, iexBidPrice?: number | null, iexBidSize?: number | null, iexClose?: number | null, iexCloseTime?: number | null, iexLastUpdated?: number | null, iexOpen?: number | null, iexOpenTime?: number | null, iexRealtimePrice?: number | null, iexRealtimeSize?: number | null, iexMarketPercent?: number | null, iexVolume?: number | null, isUSMarketOpen?: boolean | null, lastTradeTime?: number | null, latestPrice?: number | null, latestSource?: string | null, latestTime?: string | null, latestUpdate?: number | null, latestVolume?: number | null, low?: number | null, lowTime?: number | null, lowSource?: string | null, marketCap?: number | null, oddLotDelayedPrice?: number | null, oddLotDelayedPriceTime?: number | null, open?: number | null, openSource?: string | null, openTime?: number | null, peRatio?: number | null, previousClose?: number | null, previousVolume?: number | null, primaryExchange?: string | null, symbol?: string | null, week52High?: number | null, week52Low?: number | null, volume?: number | null, ytdChange?: number | null } | null } }> };

export type AllPortfolioDataFragment = { __typename?: 'Portfolio', _id: any, cash: number, name: string, description: string, private: boolean, createdAt: any, updatedAt: any, totalValue: number, owner: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string>, createdAt: any, updatedAt: any }, holdings: Array<{ __typename?: 'Holding', marketValue: number, exposure: number, profitLossUsd: number, profitLossPercent: number, dailyProfitLossUsd: number, averagePrice: number, costBasis: number, brokerFees?: number | null, direction?: HoldingDirection | null, quantity: number, type: HoldingType, source: HoldingSource, currency?: string | null, ticker: { __typename?: 'Ticker', _id: any, name: string, symbol: string, symbolType: string, exchange: string, currency: string, exchangeName: string, region: string, quote?: { __typename?: 'Quote', avgTotalVolume?: number | null, calculationPrice?: string | null, change?: number | null, changePercent?: number | null, companyName: string, close?: number | null, closeSource?: string | null, closeTime?: number | null, currency?: string | null, delayedPrice?: number | null, delayedPriceTime?: number | null, extendedPrice?: number | null, extendedChange?: number | null, extendedChangePercent?: number | null, extendedPriceTime?: number | null, high?: number | null, highSource?: string | null, highTime?: number | null, iexAskPrice?: number | null, iexAskSize?: number | null, iexBidPrice?: number | null, iexBidSize?: number | null, iexClose?: number | null, iexCloseTime?: number | null, iexLastUpdated?: number | null, iexOpen?: number | null, iexOpenTime?: number | null, iexRealtimePrice?: number | null, iexRealtimeSize?: number | null, iexMarketPercent?: number | null, iexVolume?: number | null, isUSMarketOpen?: boolean | null, lastTradeTime?: number | null, latestPrice?: number | null, latestSource?: string | null, latestTime?: string | null, latestUpdate?: number | null, latestVolume?: number | null, low?: number | null, lowTime?: number | null, lowSource?: string | null, marketCap?: number | null, oddLotDelayedPrice?: number | null, oddLotDelayedPriceTime?: number | null, open?: number | null, openSource?: string | null, openTime?: number | null, peRatio?: number | null, previousClose?: number | null, previousVolume?: number | null, primaryExchange?: string | null, symbol?: string | null, week52High?: number | null, week52Low?: number | null, volume?: number | null, ytdChange?: number | null } | null } }>, transactions: Array<{ __typename?: 'Transaction', name: string, date: any, currency: string, quantity: number, price: number, type: TransactionType, subType: TransactionSubtype }> };

export type AllTransactionDataFragment = { __typename?: 'Transaction', name: string, date: any, currency: string, quantity: number, price: number, type: TransactionType, subType: TransactionSubtype };

export type PortfoliosCreatedQueryVariables = Exact<{ [key: string]: never; }>;


export type PortfoliosCreatedQuery = { __typename?: 'Query', portfoliosCreated: Array<{ __typename?: 'PortfolioSummary', _id: any, updatedAt: any, createdAt: any, totalValue: number, owner: { __typename?: 'User', displayName: string, photos: Array<string> }, top5Holdings: Array<{ __typename?: 'Holding', costBasis: number, exposure: number, marketValue: number, ticker: { __typename?: 'Ticker', symbol: string } }> }> };

export type PortfoliosFindByIdQueryVariables = Exact<{
  _id: Scalars['ObjectId'];
}>;


export type PortfoliosFindByIdQuery = { __typename?: 'Query', portfoliosFindById: { __typename?: 'Portfolio', _id: any, cash: number, name: string, description: string, private: boolean, createdAt: any, updatedAt: any, totalValue: number, owner: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string>, createdAt: any, updatedAt: any }, holdings: Array<{ __typename?: 'Holding', marketValue: number, exposure: number, profitLossUsd: number, profitLossPercent: number, dailyProfitLossUsd: number, averagePrice: number, costBasis: number, brokerFees?: number | null, direction?: HoldingDirection | null, quantity: number, type: HoldingType, source: HoldingSource, currency?: string | null, ticker: { __typename?: 'Ticker', _id: any, name: string, symbol: string, symbolType: string, exchange: string, currency: string, exchangeName: string, region: string, quote?: { __typename?: 'Quote', avgTotalVolume?: number | null, calculationPrice?: string | null, change?: number | null, changePercent?: number | null, companyName: string, close?: number | null, closeSource?: string | null, closeTime?: number | null, currency?: string | null, delayedPrice?: number | null, delayedPriceTime?: number | null, extendedPrice?: number | null, extendedChange?: number | null, extendedChangePercent?: number | null, extendedPriceTime?: number | null, high?: number | null, highSource?: string | null, highTime?: number | null, iexAskPrice?: number | null, iexAskSize?: number | null, iexBidPrice?: number | null, iexBidSize?: number | null, iexClose?: number | null, iexCloseTime?: number | null, iexLastUpdated?: number | null, iexOpen?: number | null, iexOpenTime?: number | null, iexRealtimePrice?: number | null, iexRealtimeSize?: number | null, iexMarketPercent?: number | null, iexVolume?: number | null, isUSMarketOpen?: boolean | null, lastTradeTime?: number | null, latestPrice?: number | null, latestSource?: string | null, latestTime?: string | null, latestUpdate?: number | null, latestVolume?: number | null, low?: number | null, lowTime?: number | null, lowSource?: string | null, marketCap?: number | null, oddLotDelayedPrice?: number | null, oddLotDelayedPriceTime?: number | null, open?: number | null, openSource?: string | null, openTime?: number | null, peRatio?: number | null, previousClose?: number | null, previousVolume?: number | null, primaryExchange?: string | null, symbol?: string | null, week52High?: number | null, week52Low?: number | null, volume?: number | null, ytdChange?: number | null } | null } }>, transactions: Array<{ __typename?: 'Transaction', name: string, date: any, currency: string, quantity: number, price: number, type: TransactionType, subType: TransactionSubtype }> } };

export type PortfoliosInitEmptyMutationVariables = Exact<{ [key: string]: never; }>;


export type PortfoliosInitEmptyMutation = { __typename?: 'Mutation', portfoliosInitEmpty: { __typename?: 'RecordId', _id: string } };

export type PortfoliosRemoveMultipleMutationVariables = Exact<{
  _ids: Array<Scalars['ObjectId']> | Scalars['ObjectId'];
}>;


export type PortfoliosRemoveMultipleMutation = { __typename?: 'Mutation', portfoliosRemoveMultiple: { __typename?: 'RemoveMultipleResponse', acknowledged: boolean, deletedCount: number } };

export type PortfoliosRemoveOneMutationVariables = Exact<{
  _id: Scalars['ObjectId'];
}>;


export type PortfoliosRemoveOneMutation = { __typename?: 'Mutation', portfoliosRemoveOne: { __typename?: 'RecordId', _id: string } };

export type PortfoliosUpdateOneMutationVariables = Exact<{
  _id: Scalars['ObjectId'];
  input: UpdatePortfolioInput;
}>;


export type PortfoliosUpdateOneMutation = { __typename?: 'Mutation', portfoliosUpdateOne: { __typename?: 'PortfolioWithoutMarketData', _id: any, cash: number, createdAt: any, description: string, name: string, private: boolean, updatedAt: any } };

export type AllQuoteDataFragment = { __typename?: 'Quote', avgTotalVolume?: number | null, calculationPrice?: string | null, change?: number | null, changePercent?: number | null, companyName: string, close?: number | null, closeSource?: string | null, closeTime?: number | null, currency?: string | null, delayedPrice?: number | null, delayedPriceTime?: number | null, extendedPrice?: number | null, extendedChange?: number | null, extendedChangePercent?: number | null, extendedPriceTime?: number | null, high?: number | null, highSource?: string | null, highTime?: number | null, iexAskPrice?: number | null, iexAskSize?: number | null, iexBidPrice?: number | null, iexBidSize?: number | null, iexClose?: number | null, iexCloseTime?: number | null, iexLastUpdated?: number | null, iexOpen?: number | null, iexOpenTime?: number | null, iexRealtimePrice?: number | null, iexRealtimeSize?: number | null, iexMarketPercent?: number | null, iexVolume?: number | null, isUSMarketOpen?: boolean | null, lastTradeTime?: number | null, latestPrice?: number | null, latestSource?: string | null, latestTime?: string | null, latestUpdate?: number | null, latestVolume?: number | null, low?: number | null, lowTime?: number | null, lowSource?: string | null, marketCap?: number | null, oddLotDelayedPrice?: number | null, oddLotDelayedPriceTime?: number | null, open?: number | null, openSource?: string | null, openTime?: number | null, peRatio?: number | null, previousClose?: number | null, previousVolume?: number | null, primaryExchange?: string | null, symbol?: string | null, week52High?: number | null, week52Low?: number | null, volume?: number | null, ytdChange?: number | null };

export type AllTickerDataFragment = { __typename?: 'Ticker', cik?: string | null, createdAt: any, currency: string, exchange: string, exchangeName: string, figi?: string | null, iexId?: string | null, name: string, region: string, symbol: string, symbolType: string, updatedAt: any };

export type TickersFindByIdQueryVariables = Exact<{
  _id: Scalars['ObjectId'];
}>;


export type TickersFindByIdQuery = { __typename?: 'Query', tickersFindById: { __typename?: 'Ticker', _id: any, cik?: string | null, createdAt: any, currency: string, exchange: string, exchangeName: string, figi?: string | null, iexId?: string | null, name: string, region: string, symbol: string, symbolType: string, updatedAt: any, quote?: { __typename?: 'Quote', avgTotalVolume?: number | null, calculationPrice?: string | null, change?: number | null, changePercent?: number | null, companyName: string, close?: number | null, closeSource?: string | null, closeTime?: number | null, currency?: string | null, delayedPrice?: number | null, delayedPriceTime?: number | null, extendedPrice?: number | null, extendedChange?: number | null, extendedChangePercent?: number | null, extendedPriceTime?: number | null, high?: number | null, highSource?: string | null, highTime?: number | null, iexAskPrice?: number | null, iexAskSize?: number | null, iexBidPrice?: number | null, iexBidSize?: number | null, iexClose?: number | null, iexCloseTime?: number | null, iexLastUpdated?: number | null, iexOpen?: number | null, iexOpenTime?: number | null, iexRealtimePrice?: number | null, iexRealtimeSize?: number | null, iexMarketPercent?: number | null, iexVolume?: number | null, isUSMarketOpen?: boolean | null, lastTradeTime?: number | null, latestPrice?: number | null, latestSource?: string | null, latestTime?: string | null, latestUpdate?: number | null, latestVolume?: number | null, low?: number | null, lowTime?: number | null, lowSource?: string | null, marketCap?: number | null, oddLotDelayedPrice?: number | null, oddLotDelayedPriceTime?: number | null, open?: number | null, openSource?: string | null, openTime?: number | null, peRatio?: number | null, previousClose?: number | null, previousVolume?: number | null, primaryExchange?: string | null, symbol?: string | null, week52High?: number | null, week52Low?: number | null, volume?: number | null, ytdChange?: number | null } | null } };

export type TickersSearchQueryVariables = Exact<{
  searchTerm: Scalars['String'];
}>;


export type TickersSearchQuery = { __typename?: 'Query', tickersSearch: Array<{ __typename?: 'Ticker', _id: any, cik?: string | null, createdAt: any, currency: string, exchange: string, exchangeName: string, figi?: string | null, iexId?: string | null, name: string, region: string, symbol: string, symbolType: string, updatedAt: any, quote?: { __typename?: 'Quote', avgTotalVolume?: number | null, calculationPrice?: string | null, change?: number | null, changePercent?: number | null, companyName: string, close?: number | null, closeSource?: string | null, closeTime?: number | null, currency?: string | null, delayedPrice?: number | null, delayedPriceTime?: number | null, extendedPrice?: number | null, extendedChange?: number | null, extendedChangePercent?: number | null, extendedPriceTime?: number | null, high?: number | null, highSource?: string | null, highTime?: number | null, iexAskPrice?: number | null, iexAskSize?: number | null, iexBidPrice?: number | null, iexBidSize?: number | null, iexClose?: number | null, iexCloseTime?: number | null, iexLastUpdated?: number | null, iexOpen?: number | null, iexOpenTime?: number | null, iexRealtimePrice?: number | null, iexRealtimeSize?: number | null, iexMarketPercent?: number | null, iexVolume?: number | null, isUSMarketOpen?: boolean | null, lastTradeTime?: number | null, latestPrice?: number | null, latestSource?: string | null, latestTime?: string | null, latestUpdate?: number | null, latestVolume?: number | null, low?: number | null, lowTime?: number | null, lowSource?: string | null, marketCap?: number | null, oddLotDelayedPrice?: number | null, oddLotDelayedPriceTime?: number | null, open?: number | null, openSource?: string | null, openTime?: number | null, peRatio?: number | null, previousClose?: number | null, previousVolume?: number | null, primaryExchange?: string | null, symbol?: string | null, week52High?: number | null, week52Low?: number | null, volume?: number | null, ytdChange?: number | null } | null }> };

export type FullUserFragment = { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string>, createdAt: any, updatedAt: any };

export type UsersFindByIdQueryVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type UsersFindByIdQuery = { __typename?: 'Query', usersFindById: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string>, createdAt: any, updatedAt: any } };

export type UsersFindOrCreateMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type UsersFindOrCreateMutation = { __typename?: 'Mutation', usersFindOrCreate: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string>, createdAt: any, updatedAt: any } };

export const FullUserFragmentDoc = gql`
    fragment FullUser on User {
  _id
  displayName
  emails
  photos
  createdAt
  updatedAt
}
    `;
export const PortfolioSummaryFragmentDoc = gql`
    fragment PortfolioSummary on Portfolio {
  _id
  cash
  owner {
    ...FullUser
  }
  name
  description
  private
  createdAt
  updatedAt
  totalValue
}
    ${FullUserFragmentDoc}`;
export const AllQuoteDataFragmentDoc = gql`
    fragment AllQuoteData on Quote {
  avgTotalVolume
  calculationPrice
  change
  changePercent
  companyName
  close
  closeSource
  closeTime
  currency
  delayedPrice
  delayedPriceTime
  extendedPrice
  extendedChange
  extendedChangePercent
  extendedPriceTime
  high
  highSource
  highTime
  iexAskPrice
  iexAskSize
  iexBidPrice
  iexBidSize
  iexClose
  iexCloseTime
  iexLastUpdated
  iexOpen
  iexOpenTime
  iexRealtimePrice
  iexRealtimeSize
  iexMarketPercent
  iexVolume
  isUSMarketOpen
  lastTradeTime
  latestPrice
  latestSource
  latestTime
  latestUpdate
  latestVolume
  low
  lowTime
  lowSource
  marketCap
  oddLotDelayedPrice
  oddLotDelayedPriceTime
  open
  openSource
  openTime
  peRatio
  previousClose
  previousVolume
  primaryExchange
  symbol
  week52High
  week52Low
  volume
  ytdChange
}
    `;
export const AllHoldingDataFragmentDoc = gql`
    fragment AllHoldingData on Holding {
  marketValue
  exposure
  profitLossUsd
  profitLossPercent
  dailyProfitLossUsd
  averagePrice
  costBasis
  brokerFees
  direction
  quantity
  type
  source
  currency
  ticker {
    _id
    name
    symbol
    symbolType
    exchange
    currency
    exchangeName
    region
    quote {
      ...AllQuoteData
    }
  }
}
    ${AllQuoteDataFragmentDoc}`;
export const PortfolioHoldingsFragmentDoc = gql`
    fragment PortfolioHoldings on Portfolio {
  holdings {
    ...AllHoldingData
  }
}
    ${AllHoldingDataFragmentDoc}`;
export const AllTransactionDataFragmentDoc = gql`
    fragment AllTransactionData on Transaction {
  name
  date
  currency
  quantity
  price
  type
  subType
}
    `;
export const PortfolioTransactionsFragmentDoc = gql`
    fragment PortfolioTransactions on Portfolio {
  transactions {
    ...AllTransactionData
  }
}
    ${AllTransactionDataFragmentDoc}`;
export const AllPortfolioDataFragmentDoc = gql`
    fragment AllPortfolioData on Portfolio {
  ...PortfolioSummary
  ...PortfolioHoldings
  ...PortfolioTransactions
}
    ${PortfolioSummaryFragmentDoc}
${PortfolioHoldingsFragmentDoc}
${PortfolioTransactionsFragmentDoc}`;
export const AllTickerDataFragmentDoc = gql`
    fragment AllTickerData on Ticker {
  cik
  createdAt
  currency
  exchange
  exchangeName
  figi
  iexId
  name
  region
  symbol
  symbolType
  updatedAt
}
    `;
export const PortfoliosCreatedDocument = gql`
    query portfoliosCreated {
  portfoliosCreated {
    _id
    owner {
      displayName
      photos
    }
    updatedAt
    createdAt
    totalValue
    top5Holdings {
      costBasis
      exposure
      marketValue
      ticker {
        symbol
      }
    }
  }
}
    `;
export const PortfoliosFindByIdDocument = gql`
    query portfoliosFindById($_id: ObjectId!) {
  portfoliosFindById(_id: $_id) {
    _id
    ...AllPortfolioData
  }
}
    ${AllPortfolioDataFragmentDoc}`;
export const PortfoliosInitEmptyDocument = gql`
    mutation portfoliosInitEmpty {
  portfoliosInitEmpty {
    _id
  }
}
    `;
export const PortfoliosRemoveMultipleDocument = gql`
    mutation portfoliosRemoveMultiple($_ids: [ObjectId!]!) {
  portfoliosRemoveMultiple(_ids: $_ids) {
    acknowledged
    deletedCount
  }
}
    `;
export const PortfoliosRemoveOneDocument = gql`
    mutation portfoliosRemoveOne($_id: ObjectId!) {
  portfoliosRemoveOne(_id: $_id) {
    _id
  }
}
    `;
export const PortfoliosUpdateOneDocument = gql`
    mutation portfoliosUpdateOne($_id: ObjectId!, $input: UpdatePortfolioInput!) {
  portfoliosUpdateOne(_id: $_id, input: $input) {
    _id
    cash
    createdAt
    description
    name
    private
    updatedAt
  }
}
    `;
export const TickersFindByIdDocument = gql`
    query tickersFindById($_id: ObjectId!) {
  tickersFindById(_id: $_id) {
    _id
    ...AllTickerData
    quote {
      ...AllQuoteData
    }
  }
}
    ${AllTickerDataFragmentDoc}
${AllQuoteDataFragmentDoc}`;
export const TickersSearchDocument = gql`
    query tickersSearch($searchTerm: String!) {
  tickersSearch(searchTerm: $searchTerm) {
    _id
    ...AllTickerData
    quote {
      ...AllQuoteData
    }
  }
}
    ${AllTickerDataFragmentDoc}
${AllQuoteDataFragmentDoc}`;
export const UsersFindByIdDocument = gql`
    query usersFindById($_id: ID!) {
  usersFindById(_id: $_id) {
    _id
    ...FullUser
  }
}
    ${FullUserFragmentDoc}`;
export const UsersFindOrCreateDocument = gql`
    mutation usersFindOrCreate($input: CreateUserInput!) {
  usersFindOrCreate(input: $input) {
    _id
    ...FullUser
  }
}
    ${FullUserFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    portfoliosCreated(variables?: PortfoliosCreatedQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PortfoliosCreatedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PortfoliosCreatedQuery>(PortfoliosCreatedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'portfoliosCreated', 'query');
    },
    portfoliosFindById(variables: PortfoliosFindByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PortfoliosFindByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PortfoliosFindByIdQuery>(PortfoliosFindByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'portfoliosFindById', 'query');
    },
    portfoliosInitEmpty(variables?: PortfoliosInitEmptyMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PortfoliosInitEmptyMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<PortfoliosInitEmptyMutation>(PortfoliosInitEmptyDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'portfoliosInitEmpty', 'mutation');
    },
    portfoliosRemoveMultiple(variables: PortfoliosRemoveMultipleMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PortfoliosRemoveMultipleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<PortfoliosRemoveMultipleMutation>(PortfoliosRemoveMultipleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'portfoliosRemoveMultiple', 'mutation');
    },
    portfoliosRemoveOne(variables: PortfoliosRemoveOneMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PortfoliosRemoveOneMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<PortfoliosRemoveOneMutation>(PortfoliosRemoveOneDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'portfoliosRemoveOne', 'mutation');
    },
    portfoliosUpdateOne(variables: PortfoliosUpdateOneMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PortfoliosUpdateOneMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<PortfoliosUpdateOneMutation>(PortfoliosUpdateOneDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'portfoliosUpdateOne', 'mutation');
    },
    tickersFindById(variables: TickersFindByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TickersFindByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TickersFindByIdQuery>(TickersFindByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'tickersFindById', 'query');
    },
    tickersSearch(variables: TickersSearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TickersSearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TickersSearchQuery>(TickersSearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'tickersSearch', 'query');
    },
    usersFindById(variables: UsersFindByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UsersFindByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UsersFindByIdQuery>(UsersFindByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'usersFindById', 'query');
    },
    usersFindOrCreate(variables: UsersFindOrCreateMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UsersFindOrCreateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UsersFindOrCreateMutation>(UsersFindOrCreateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'usersFindOrCreate', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;