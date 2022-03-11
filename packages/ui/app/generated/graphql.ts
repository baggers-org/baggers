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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** Mongo object id scalar type */
  ObjectId: any;
};

export type AddPositionInput = {
  averagePrice: Scalars['Float'];
  brokerFees?: InputMaybe<Scalars['Float']>;
  closeDate?: InputMaybe<Scalars['DateTime']>;
  direction: PositionDirection;
  openDate?: InputMaybe<Scalars['DateTime']>;
  positionSize: Scalars['Float'];
  positionType: PositionType;
  symbol: Scalars['ObjectId'];
};

export type AddPositionPayload = {
  __typename?: 'AddPositionPayload';
  record: Portfolio;
  recordId: Scalars['ObjectId'];
};

export type CreatePortfolioPayload = {
  __typename?: 'CreatePortfolioPayload';
  record: Portfolio;
  recordId: Scalars['ObjectId'];
};

export type FindOrCreateUserInput = {
  _id: Scalars['String'];
  displayName?: InputMaybe<Scalars['String']>;
  emails?: InputMaybe<Array<Scalars['String']>>;
  photos?: InputMaybe<Array<Scalars['String']>>;
};

export type FindOrCreateUserPayload = {
  __typename?: 'FindOrCreateUserPayload';
  record: User;
  recordId: Scalars['ObjectId'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addPosition: AddPositionPayload;
  /** Create a portfolio under your username */
  createPortfolio: CreatePortfolioPayload;
  /** Delete the specified portfolio if you have permission to do so */
  deletePortfolio: CreatePortfolioPayload;
  findOrCreateUser: FindOrCreateUserPayload;
  removePosition: RemovePositionPayload;
  /** Update portfolio details */
  updatePortfolio: UpdatePortfolioPayload;
};


export type MutationAddPositionArgs = {
  id: Scalars['ObjectId'];
  record: AddPositionInput;
};


export type MutationDeletePortfolioArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationFindOrCreateUserArgs = {
  record: FindOrCreateUserInput;
};


export type MutationRemovePositionArgs = {
  portfolio_id: Scalars['ObjectId'];
  position_id: Scalars['ObjectId'];
};


export type MutationUpdatePortfolioArgs = {
  _id: Scalars['ObjectId'];
  input: UpdatePortfolioInput;
};

export type Portfolio = {
  __typename?: 'Portfolio';
  _id: Scalars['ObjectId'];
  cash: Scalars['Float'];
  description: Scalars['String'];
  name: Scalars['String'];
  owner: User;
  positions: Array<Position>;
  private: Scalars['Boolean'];
  totalValue: Scalars['Float'];
};

export type Position = {
  __typename?: 'Position';
  _id: Scalars['ObjectId'];
  averagePrice: Scalars['Float'];
  brokerFees: Scalars['Float'];
  closeDate?: Maybe<Scalars['DateTime']>;
  costBasis: Scalars['Float'];
  dailyProfitLossUsd: Scalars['Float'];
  direction: PositionDirection;
  exposure: Scalars['Float'];
  marketValue: Scalars['Float'];
  openDate?: Maybe<Scalars['DateTime']>;
  positionSize: Scalars['Float'];
  positionType: PositionType;
  profitLossPercent: Scalars['Float'];
  profitLossUsd: Scalars['Float'];
  symbol: Symbol;
};

/** Buying vs selling */
export enum PositionDirection {
  Long = 'long',
  Short = 'short'
}

/** Shares, calls, puts */
export enum PositionType {
  Calls = 'calls',
  Puts = 'puts',
  Shares = 'shares'
}

export type Query = {
  __typename?: 'Query';
  myPortfolios: Array<Portfolio>;
  portfolio: Portfolio;
  searchSymbols: Array<Symbol>;
};


export type QueryPortfolioArgs = {
  portfolioId: Scalars['ObjectId'];
};


export type QuerySearchSymbolsArgs = {
  search: Scalars['String'];
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
  companyName?: Maybe<Scalars['String']>;
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

export type RemovePositionPayload = {
  __typename?: 'RemovePositionPayload';
  record: Portfolio;
  recordId: Scalars['ObjectId'];
};

export type Symbol = {
  __typename?: 'Symbol';
  _id: Scalars['ObjectId'];
  currency: Scalars['String'];
  exchange: Scalars['String'];
  exchangeName: Scalars['String'];
  name: Scalars['String'];
  quote: Quote;
  region: Scalars['String'];
  symbol: Scalars['String'];
  symbolType: Scalars['String'];
};

export type UpdatePortfolioInput = {
  cash?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  private?: InputMaybe<Scalars['Boolean']>;
};

export type UpdatePortfolioPayload = {
  __typename?: 'UpdatePortfolioPayload';
  record: Portfolio;
  recordId: Scalars['ObjectId'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  displayName: Scalars['String'];
  emails?: Maybe<Array<Scalars['String']>>;
  photos: Array<Scalars['String']>;
};

export type PortfolioSummaryFragment = { __typename?: 'Portfolio', _id: any, cash: number, name: string, description: string, totalValue: number, owner: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string> } };

export type PortfolioPositionsFragment = { __typename?: 'Portfolio', positions: Array<{ __typename?: 'Position', _id: any, marketValue: number, exposure: number, profitLossUsd: number, profitLossPercent: number, dailyProfitLossUsd: number, direction: PositionDirection, averagePrice: number, costBasis: number, brokerFees: number, positionSize: number, openDate?: any | null, closeDate?: any | null, symbol: { __typename?: 'Symbol', name: string, symbol: string, symbolType: string, exchange: string, region: string, currency: string, quote: { __typename?: 'Quote', avgTotalVolume?: number | null, calculationPrice?: string | null, change?: number | null, changePercent?: number | null, companyName?: string | null, close?: number | null, closeSource?: string | null, closeTime?: number | null, currency?: string | null, delayedPrice?: number | null, delayedPriceTime?: number | null, extendedPrice?: number | null, extendedChange?: number | null, extendedChangePercent?: number | null, extendedPriceTime?: number | null, high?: number | null, highSource?: string | null, highTime?: number | null, iexAskPrice?: number | null, iexAskSize?: number | null, iexBidPrice?: number | null, iexBidSize?: number | null, iexClose?: number | null, iexCloseTime?: number | null, iexLastUpdated?: number | null, iexOpen?: number | null, iexOpenTime?: number | null, iexRealtimePrice?: number | null, iexRealtimeSize?: number | null, iexMarketPercent?: number | null, iexVolume?: number | null, isUSMarketOpen?: boolean | null, lastTradeTime?: number | null, latestPrice?: number | null, latestSource?: string | null, latestTime?: string | null, latestUpdate?: number | null, latestVolume?: number | null, low?: number | null, lowTime?: number | null, lowSource?: string | null, marketCap?: number | null, oddLotDelayedPrice?: number | null, oddLotDelayedPriceTime?: number | null, open?: number | null, openSource?: string | null, openTime?: number | null, peRatio?: number | null, previousClose?: number | null, previousVolume?: number | null, primaryExchange?: string | null, symbol?: string | null, week52High?: number | null, week52Low?: number | null, volume?: number | null, ytdChange?: number | null } } }> };

export type AllPortfolioDataFragment = { __typename?: 'Portfolio', _id: any, cash: number, name: string, description: string, totalValue: number, owner: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string> }, positions: Array<{ __typename?: 'Position', _id: any, marketValue: number, exposure: number, profitLossUsd: number, profitLossPercent: number, dailyProfitLossUsd: number, direction: PositionDirection, averagePrice: number, costBasis: number, brokerFees: number, positionSize: number, openDate?: any | null, closeDate?: any | null, symbol: { __typename?: 'Symbol', name: string, symbol: string, symbolType: string, exchange: string, region: string, currency: string, quote: { __typename?: 'Quote', avgTotalVolume?: number | null, calculationPrice?: string | null, change?: number | null, changePercent?: number | null, companyName?: string | null, close?: number | null, closeSource?: string | null, closeTime?: number | null, currency?: string | null, delayedPrice?: number | null, delayedPriceTime?: number | null, extendedPrice?: number | null, extendedChange?: number | null, extendedChangePercent?: number | null, extendedPriceTime?: number | null, high?: number | null, highSource?: string | null, highTime?: number | null, iexAskPrice?: number | null, iexAskSize?: number | null, iexBidPrice?: number | null, iexBidSize?: number | null, iexClose?: number | null, iexCloseTime?: number | null, iexLastUpdated?: number | null, iexOpen?: number | null, iexOpenTime?: number | null, iexRealtimePrice?: number | null, iexRealtimeSize?: number | null, iexMarketPercent?: number | null, iexVolume?: number | null, isUSMarketOpen?: boolean | null, lastTradeTime?: number | null, latestPrice?: number | null, latestSource?: string | null, latestTime?: string | null, latestUpdate?: number | null, latestVolume?: number | null, low?: number | null, lowTime?: number | null, lowSource?: string | null, marketCap?: number | null, oddLotDelayedPrice?: number | null, oddLotDelayedPriceTime?: number | null, open?: number | null, openSource?: string | null, openTime?: number | null, peRatio?: number | null, previousClose?: number | null, previousVolume?: number | null, primaryExchange?: string | null, symbol?: string | null, week52High?: number | null, week52Low?: number | null, volume?: number | null, ytdChange?: number | null } } }> };

export type AllPositionDataFragment = { __typename?: 'Position', _id: any, marketValue: number, exposure: number, profitLossUsd: number, profitLossPercent: number, dailyProfitLossUsd: number, direction: PositionDirection, averagePrice: number, costBasis: number, brokerFees: number, positionSize: number, openDate?: any | null, closeDate?: any | null, symbol: { __typename?: 'Symbol', name: string, symbol: string, symbolType: string, exchange: string, region: string, currency: string, quote: { __typename?: 'Quote', avgTotalVolume?: number | null, calculationPrice?: string | null, change?: number | null, changePercent?: number | null, companyName?: string | null, close?: number | null, closeSource?: string | null, closeTime?: number | null, currency?: string | null, delayedPrice?: number | null, delayedPriceTime?: number | null, extendedPrice?: number | null, extendedChange?: number | null, extendedChangePercent?: number | null, extendedPriceTime?: number | null, high?: number | null, highSource?: string | null, highTime?: number | null, iexAskPrice?: number | null, iexAskSize?: number | null, iexBidPrice?: number | null, iexBidSize?: number | null, iexClose?: number | null, iexCloseTime?: number | null, iexLastUpdated?: number | null, iexOpen?: number | null, iexOpenTime?: number | null, iexRealtimePrice?: number | null, iexRealtimeSize?: number | null, iexMarketPercent?: number | null, iexVolume?: number | null, isUSMarketOpen?: boolean | null, lastTradeTime?: number | null, latestPrice?: number | null, latestSource?: string | null, latestTime?: string | null, latestUpdate?: number | null, latestVolume?: number | null, low?: number | null, lowTime?: number | null, lowSource?: string | null, marketCap?: number | null, oddLotDelayedPrice?: number | null, oddLotDelayedPriceTime?: number | null, open?: number | null, openSource?: string | null, openTime?: number | null, peRatio?: number | null, previousClose?: number | null, previousVolume?: number | null, primaryExchange?: string | null, symbol?: string | null, week52High?: number | null, week52Low?: number | null, volume?: number | null, ytdChange?: number | null } } };

export type FullUserFragment = { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string> };

export type AddPositionMutationVariables = Exact<{
  record: AddPositionInput;
  portfolioId: Scalars['ObjectId'];
}>;


export type AddPositionMutation = { __typename?: 'Mutation', addPosition: { __typename?: 'AddPositionPayload', recordId: any } };

export type CreatePortfolioMutationVariables = Exact<{ [key: string]: never; }>;


export type CreatePortfolioMutation = { __typename?: 'Mutation', createPortfolio: { __typename?: 'CreatePortfolioPayload', record: { __typename?: 'Portfolio', _id: any, cash: number, name: string, description: string, totalValue: number, owner: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string> }, positions: Array<{ __typename?: 'Position', _id: any, marketValue: number, exposure: number, profitLossUsd: number, profitLossPercent: number, dailyProfitLossUsd: number, direction: PositionDirection, averagePrice: number, costBasis: number, brokerFees: number, positionSize: number, openDate?: any | null, closeDate?: any | null, symbol: { __typename?: 'Symbol', name: string, symbol: string, symbolType: string, exchange: string, region: string, currency: string, quote: { __typename?: 'Quote', avgTotalVolume?: number | null, calculationPrice?: string | null, change?: number | null, changePercent?: number | null, companyName?: string | null, close?: number | null, closeSource?: string | null, closeTime?: number | null, currency?: string | null, delayedPrice?: number | null, delayedPriceTime?: number | null, extendedPrice?: number | null, extendedChange?: number | null, extendedChangePercent?: number | null, extendedPriceTime?: number | null, high?: number | null, highSource?: string | null, highTime?: number | null, iexAskPrice?: number | null, iexAskSize?: number | null, iexBidPrice?: number | null, iexBidSize?: number | null, iexClose?: number | null, iexCloseTime?: number | null, iexLastUpdated?: number | null, iexOpen?: number | null, iexOpenTime?: number | null, iexRealtimePrice?: number | null, iexRealtimeSize?: number | null, iexMarketPercent?: number | null, iexVolume?: number | null, isUSMarketOpen?: boolean | null, lastTradeTime?: number | null, latestPrice?: number | null, latestSource?: string | null, latestTime?: string | null, latestUpdate?: number | null, latestVolume?: number | null, low?: number | null, lowTime?: number | null, lowSource?: string | null, marketCap?: number | null, oddLotDelayedPrice?: number | null, oddLotDelayedPriceTime?: number | null, open?: number | null, openSource?: string | null, openTime?: number | null, peRatio?: number | null, previousClose?: number | null, previousVolume?: number | null, primaryExchange?: string | null, symbol?: string | null, week52High?: number | null, week52Low?: number | null, volume?: number | null, ytdChange?: number | null } } }> } } };

export type DeletePortfolioMutationVariables = Exact<{
  id: Scalars['ObjectId'];
}>;


export type DeletePortfolioMutation = { __typename?: 'Mutation', deletePortfolio: { __typename?: 'CreatePortfolioPayload', recordId: any } };

export type FindOrCreateUserMutationVariables = Exact<{
  record: FindOrCreateUserInput;
}>;


export type FindOrCreateUserMutation = { __typename?: 'Mutation', findOrCreateUser: { __typename?: 'FindOrCreateUserPayload', record: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string> } } };

export type RemovePositionMutationVariables = Exact<{
  portfolio_id: Scalars['ObjectId'];
  position_id: Scalars['ObjectId'];
}>;


export type RemovePositionMutation = { __typename?: 'Mutation', removePosition: { __typename?: 'RemovePositionPayload', recordId: any } };

export type UpdatePortfolioMutationVariables = Exact<{
  input: UpdatePortfolioInput;
  id: Scalars['ObjectId'];
}>;


export type UpdatePortfolioMutation = { __typename?: 'Mutation', updatePortfolio: { __typename?: 'UpdatePortfolioPayload', record: { __typename?: 'Portfolio', _id: any } } };

export type MyPortfoliosSummaryQueryVariables = Exact<{ [key: string]: never; }>;


export type MyPortfoliosSummaryQuery = { __typename?: 'Query', myPortfolios: Array<{ __typename?: 'Portfolio', _id: any, cash: number, name: string, description: string, totalValue: number, owner: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string> } }> };

export type PortfolioQueryVariables = Exact<{
  id: Scalars['ObjectId'];
}>;


export type PortfolioQuery = { __typename?: 'Query', portfolio: { __typename?: 'Portfolio', _id: any, cash: number, name: string, description: string, totalValue: number, owner: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string> }, positions: Array<{ __typename?: 'Position', _id: any, marketValue: number, exposure: number, profitLossUsd: number, profitLossPercent: number, dailyProfitLossUsd: number, direction: PositionDirection, averagePrice: number, costBasis: number, brokerFees: number, positionSize: number, openDate?: any | null, closeDate?: any | null, symbol: { __typename?: 'Symbol', name: string, symbol: string, symbolType: string, exchange: string, region: string, currency: string, quote: { __typename?: 'Quote', avgTotalVolume?: number | null, calculationPrice?: string | null, change?: number | null, changePercent?: number | null, companyName?: string | null, close?: number | null, closeSource?: string | null, closeTime?: number | null, currency?: string | null, delayedPrice?: number | null, delayedPriceTime?: number | null, extendedPrice?: number | null, extendedChange?: number | null, extendedChangePercent?: number | null, extendedPriceTime?: number | null, high?: number | null, highSource?: string | null, highTime?: number | null, iexAskPrice?: number | null, iexAskSize?: number | null, iexBidPrice?: number | null, iexBidSize?: number | null, iexClose?: number | null, iexCloseTime?: number | null, iexLastUpdated?: number | null, iexOpen?: number | null, iexOpenTime?: number | null, iexRealtimePrice?: number | null, iexRealtimeSize?: number | null, iexMarketPercent?: number | null, iexVolume?: number | null, isUSMarketOpen?: boolean | null, lastTradeTime?: number | null, latestPrice?: number | null, latestSource?: string | null, latestTime?: string | null, latestUpdate?: number | null, latestVolume?: number | null, low?: number | null, lowTime?: number | null, lowSource?: string | null, marketCap?: number | null, oddLotDelayedPrice?: number | null, oddLotDelayedPriceTime?: number | null, open?: number | null, openSource?: string | null, openTime?: number | null, peRatio?: number | null, previousClose?: number | null, previousVolume?: number | null, primaryExchange?: string | null, symbol?: string | null, week52High?: number | null, week52Low?: number | null, volume?: number | null, ytdChange?: number | null } } }> } };

export type SearchSymbolsQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type SearchSymbolsQuery = { __typename?: 'Query', searchSymbols: Array<{ __typename?: 'Symbol', symbol: string, _id: any, name: string, exchange: string, exchangeName: string, region: string, symbolType: string, currency: string, quote: { __typename?: 'Quote', latestTime?: string | null, latestPrice?: number | null } }> };

export const FullUserFragmentDoc = gql`
    fragment FullUser on User {
  _id
  displayName
  emails
  photos
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
  totalValue
}
    ${FullUserFragmentDoc}`;
export const AllPositionDataFragmentDoc = gql`
    fragment AllPositionData on Position {
  _id
  marketValue
  exposure
  profitLossUsd
  profitLossPercent
  dailyProfitLossUsd
  direction
  averagePrice
  costBasis
  brokerFees
  positionSize
  openDate
  closeDate
  symbol {
    name
    symbol
    symbolType
    exchange
    region
    currency
    quote {
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
  }
}
    `;
export const PortfolioPositionsFragmentDoc = gql`
    fragment PortfolioPositions on Portfolio {
  positions {
    ...AllPositionData
  }
}
    ${AllPositionDataFragmentDoc}`;
export const AllPortfolioDataFragmentDoc = gql`
    fragment AllPortfolioData on Portfolio {
  ...PortfolioSummary
  ...PortfolioPositions
}
    ${PortfolioSummaryFragmentDoc}
${PortfolioPositionsFragmentDoc}`;
export const AddPositionDocument = gql`
    mutation addPosition($record: AddPositionInput!, $portfolioId: ObjectId!) {
  addPosition(id: $portfolioId, record: $record) {
    recordId
  }
}
    `;
export const CreatePortfolioDocument = gql`
    mutation createPortfolio {
  createPortfolio {
    record {
      _id
      ...AllPortfolioData
    }
  }
}
    ${AllPortfolioDataFragmentDoc}`;
export const DeletePortfolioDocument = gql`
    mutation deletePortfolio($id: ObjectId!) {
  deletePortfolio(_id: $id) {
    recordId
  }
}
    `;
export const FindOrCreateUserDocument = gql`
    mutation findOrCreateUser($record: FindOrCreateUserInput!) {
  findOrCreateUser(record: $record) {
    record {
      _id
      ...FullUser
    }
  }
}
    ${FullUserFragmentDoc}`;
export const RemovePositionDocument = gql`
    mutation removePosition($portfolio_id: ObjectId!, $position_id: ObjectId!) {
  removePosition(portfolio_id: $portfolio_id, position_id: $position_id) {
    recordId
  }
}
    `;
export const UpdatePortfolioDocument = gql`
    mutation updatePortfolio($input: UpdatePortfolioInput!, $id: ObjectId!) {
  updatePortfolio(input: $input, _id: $id) {
    record {
      _id
    }
  }
}
    `;
export const MyPortfoliosSummaryDocument = gql`
    query myPortfoliosSummary {
  myPortfolios {
    ...PortfolioSummary
  }
}
    ${PortfolioSummaryFragmentDoc}`;
export const PortfolioDocument = gql`
    query portfolio($id: ObjectId!) {
  portfolio(portfolioId: $id) {
    _id
    ...AllPortfolioData
  }
}
    ${AllPortfolioDataFragmentDoc}`;
export const SearchSymbolsDocument = gql`
    query searchSymbols($search: String!) {
  searchSymbols(search: $search) {
    symbol
    _id
    name
    exchange
    exchangeName
    region
    symbolType
    currency
    quote {
      latestTime
      latestPrice
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    addPosition(variables: AddPositionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddPositionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddPositionMutation>(AddPositionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addPosition', 'mutation');
    },
    createPortfolio(variables?: CreatePortfolioMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreatePortfolioMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePortfolioMutation>(CreatePortfolioDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createPortfolio', 'mutation');
    },
    deletePortfolio(variables: DeletePortfolioMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeletePortfolioMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeletePortfolioMutation>(DeletePortfolioDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deletePortfolio', 'mutation');
    },
    findOrCreateUser(variables: FindOrCreateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FindOrCreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<FindOrCreateUserMutation>(FindOrCreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'findOrCreateUser', 'mutation');
    },
    removePosition(variables: RemovePositionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RemovePositionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RemovePositionMutation>(RemovePositionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'removePosition', 'mutation');
    },
    updatePortfolio(variables: UpdatePortfolioMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdatePortfolioMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdatePortfolioMutation>(UpdatePortfolioDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updatePortfolio', 'mutation');
    },
    myPortfoliosSummary(variables?: MyPortfoliosSummaryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MyPortfoliosSummaryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MyPortfoliosSummaryQuery>(MyPortfoliosSummaryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'myPortfoliosSummary', 'query');
    },
    portfolio(variables: PortfolioQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PortfolioQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PortfolioQuery>(PortfolioDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'portfolio', 'query');
    },
    searchSymbols(variables: SearchSymbolsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SearchSymbolsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SearchSymbolsQuery>(SearchSymbolsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'searchSymbols', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;