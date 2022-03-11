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
  symbol_id: Scalars['ObjectId'];
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
  Long = 'Long',
  Short = 'Short'
}

/** Shares, calls, puts */
export enum PositionType {
  Calls = 'Calls',
  Puts = 'Puts',
  Shares = 'Shares'
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
  avgTotalVolume: Scalars['Float'];
  calculationPrice: Scalars['String'];
  change: Scalars['Float'];
  changePercent: Scalars['Float'];
  close: Scalars['Float'];
  closeSource: Scalars['String'];
  closeTime: Scalars['Float'];
  companyName: Scalars['String'];
  currency: Scalars['String'];
  delayedPrice: Scalars['Float'];
  delayedPriceTime: Scalars['Float'];
  extendedChange: Scalars['Float'];
  extendedChangePercent: Scalars['Float'];
  extendedPrice: Scalars['Float'];
  extendedPriceTime: Scalars['Float'];
  high: Scalars['Float'];
  highSource: Scalars['String'];
  highTime: Scalars['Float'];
  iexAskPrice: Scalars['Float'];
  iexAskSize: Scalars['Float'];
  iexBidPrice: Scalars['Float'];
  iexBidSize: Scalars['Float'];
  iexClose: Scalars['Float'];
  iexCloseTime: Scalars['Float'];
  iexLastUpdated: Scalars['Float'];
  iexMarketPercent: Scalars['Float'];
  iexOpen: Scalars['Float'];
  iexOpenTime: Scalars['Float'];
  iexRealtimePrice: Scalars['Float'];
  iexRealtimeSize: Scalars['Float'];
  iexVolume: Scalars['Float'];
  isUSMarketOpen: Scalars['Boolean'];
  lastTradeTime: Scalars['Float'];
  latestPrice: Scalars['Float'];
  latestSource: Scalars['String'];
  latestTime: Scalars['String'];
  latestUpdate: Scalars['Float'];
  latestVolume: Scalars['Float'];
  low: Scalars['Float'];
  lowSource: Scalars['String'];
  lowTime: Scalars['Float'];
  marketCap: Scalars['Float'];
  oddLotDelayedPrice: Scalars['Float'];
  oddLotDelayedPriceTime: Scalars['Float'];
  open: Scalars['Float'];
  openSource: Scalars['String'];
  openTime: Scalars['Float'];
  peRatio: Scalars['Float'];
  previousClose: Scalars['Float'];
  previousVolume: Scalars['Float'];
  primaryExchange: Scalars['String'];
  symbol: Scalars['String'];
  volume: Scalars['Float'];
  week52High: Scalars['Float'];
  week52Low: Scalars['Float'];
  ytdChange: Scalars['Float'];
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

export type PortfolioPositionsFragment = { __typename?: 'Portfolio', positions: Array<{ __typename?: 'Position', _id: any, marketValue: number, direction: PositionDirection, exposure: number, averagePrice: number, costBasis: number, brokerFees: number, positionSize: number, profitLossUsd: number, profitLossPercent: number, dailyProfitLossUsd: number, openDate?: any | null, closeDate?: any | null, symbol: { __typename?: 'Symbol', name: string, symbol: string, symbolType: string, exchange: string, region: string, currency: string, quote: { __typename?: 'Quote', avgTotalVolume: number, calculationPrice: string, change: number, changePercent: number, companyName: string, close: number, closeSource: string, closeTime: number, currency: string, delayedPrice: number, delayedPriceTime: number, extendedPrice: number, extendedChange: number, extendedChangePercent: number, extendedPriceTime: number, high: number, highSource: string, highTime: number, iexAskPrice: number, iexAskSize: number, iexBidPrice: number, iexBidSize: number, iexClose: number, iexCloseTime: number, iexLastUpdated: number, iexOpen: number, iexOpenTime: number, iexRealtimePrice: number, iexRealtimeSize: number, iexMarketPercent: number, iexVolume: number, isUSMarketOpen: boolean, lastTradeTime: number, latestPrice: number, latestSource: string, latestTime: string, latestUpdate: number, latestVolume: number, low: number, lowTime: number, lowSource: string, marketCap: number, oddLotDelayedPrice: number, oddLotDelayedPriceTime: number, open: number, openSource: string, openTime: number, peRatio: number, previousClose: number, previousVolume: number, primaryExchange: string, symbol: string, week52High: number, week52Low: number, volume: number, ytdChange: number } } }> };

export type AllPortfolioDataFragment = { __typename?: 'Portfolio', _id: any, cash: number, name: string, description: string, totalValue: number, owner: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string> }, positions: Array<{ __typename?: 'Position', _id: any, marketValue: number, direction: PositionDirection, exposure: number, averagePrice: number, costBasis: number, brokerFees: number, positionSize: number, profitLossUsd: number, profitLossPercent: number, dailyProfitLossUsd: number, openDate?: any | null, closeDate?: any | null, symbol: { __typename?: 'Symbol', name: string, symbol: string, symbolType: string, exchange: string, region: string, currency: string, quote: { __typename?: 'Quote', avgTotalVolume: number, calculationPrice: string, change: number, changePercent: number, companyName: string, close: number, closeSource: string, closeTime: number, currency: string, delayedPrice: number, delayedPriceTime: number, extendedPrice: number, extendedChange: number, extendedChangePercent: number, extendedPriceTime: number, high: number, highSource: string, highTime: number, iexAskPrice: number, iexAskSize: number, iexBidPrice: number, iexBidSize: number, iexClose: number, iexCloseTime: number, iexLastUpdated: number, iexOpen: number, iexOpenTime: number, iexRealtimePrice: number, iexRealtimeSize: number, iexMarketPercent: number, iexVolume: number, isUSMarketOpen: boolean, lastTradeTime: number, latestPrice: number, latestSource: string, latestTime: string, latestUpdate: number, latestVolume: number, low: number, lowTime: number, lowSource: string, marketCap: number, oddLotDelayedPrice: number, oddLotDelayedPriceTime: number, open: number, openSource: string, openTime: number, peRatio: number, previousClose: number, previousVolume: number, primaryExchange: string, symbol: string, week52High: number, week52Low: number, volume: number, ytdChange: number } } }> };

export type AllPositionDataFragment = { __typename?: 'Position', _id: any, marketValue: number, direction: PositionDirection, exposure: number, averagePrice: number, costBasis: number, brokerFees: number, positionSize: number, profitLossUsd: number, profitLossPercent: number, dailyProfitLossUsd: number, openDate?: any | null, closeDate?: any | null, symbol: { __typename?: 'Symbol', name: string, symbol: string, symbolType: string, exchange: string, region: string, currency: string, quote: { __typename?: 'Quote', avgTotalVolume: number, calculationPrice: string, change: number, changePercent: number, companyName: string, close: number, closeSource: string, closeTime: number, currency: string, delayedPrice: number, delayedPriceTime: number, extendedPrice: number, extendedChange: number, extendedChangePercent: number, extendedPriceTime: number, high: number, highSource: string, highTime: number, iexAskPrice: number, iexAskSize: number, iexBidPrice: number, iexBidSize: number, iexClose: number, iexCloseTime: number, iexLastUpdated: number, iexOpen: number, iexOpenTime: number, iexRealtimePrice: number, iexRealtimeSize: number, iexMarketPercent: number, iexVolume: number, isUSMarketOpen: boolean, lastTradeTime: number, latestPrice: number, latestSource: string, latestTime: string, latestUpdate: number, latestVolume: number, low: number, lowTime: number, lowSource: string, marketCap: number, oddLotDelayedPrice: number, oddLotDelayedPriceTime: number, open: number, openSource: string, openTime: number, peRatio: number, previousClose: number, previousVolume: number, primaryExchange: string, symbol: string, week52High: number, week52Low: number, volume: number, ytdChange: number } } };

export type FullUserFragment = { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string> };

export type AddPositionMutationVariables = Exact<{
  record: AddPositionInput;
  portfolioId: Scalars['ObjectId'];
}>;


export type AddPositionMutation = { __typename?: 'Mutation', addPosition: { __typename?: 'AddPositionPayload', recordId: any } };

export type CreatePortfolioMutationVariables = Exact<{ [key: string]: never; }>;


export type CreatePortfolioMutation = { __typename?: 'Mutation', createPortfolio: { __typename?: 'CreatePortfolioPayload', record: { __typename?: 'Portfolio', _id: any, cash: number, name: string, description: string, totalValue: number, owner: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string> }, positions: Array<{ __typename?: 'Position', _id: any, marketValue: number, direction: PositionDirection, exposure: number, averagePrice: number, costBasis: number, brokerFees: number, positionSize: number, profitLossUsd: number, profitLossPercent: number, dailyProfitLossUsd: number, openDate?: any | null, closeDate?: any | null, symbol: { __typename?: 'Symbol', name: string, symbol: string, symbolType: string, exchange: string, region: string, currency: string, quote: { __typename?: 'Quote', avgTotalVolume: number, calculationPrice: string, change: number, changePercent: number, companyName: string, close: number, closeSource: string, closeTime: number, currency: string, delayedPrice: number, delayedPriceTime: number, extendedPrice: number, extendedChange: number, extendedChangePercent: number, extendedPriceTime: number, high: number, highSource: string, highTime: number, iexAskPrice: number, iexAskSize: number, iexBidPrice: number, iexBidSize: number, iexClose: number, iexCloseTime: number, iexLastUpdated: number, iexOpen: number, iexOpenTime: number, iexRealtimePrice: number, iexRealtimeSize: number, iexMarketPercent: number, iexVolume: number, isUSMarketOpen: boolean, lastTradeTime: number, latestPrice: number, latestSource: string, latestTime: string, latestUpdate: number, latestVolume: number, low: number, lowTime: number, lowSource: string, marketCap: number, oddLotDelayedPrice: number, oddLotDelayedPriceTime: number, open: number, openSource: string, openTime: number, peRatio: number, previousClose: number, previousVolume: number, primaryExchange: string, symbol: string, week52High: number, week52Low: number, volume: number, ytdChange: number } } }> } } };

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


export type RemovePositionMutation = { __typename?: 'Mutation', removePosition: { __typename?: 'RemovePositionPayload', record: { __typename?: 'Portfolio', _id: any, cash: number, name: string, description: string, totalValue: number, owner: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string> }, positions: Array<{ __typename?: 'Position', _id: any, marketValue: number, direction: PositionDirection, exposure: number, averagePrice: number, costBasis: number, brokerFees: number, positionSize: number, profitLossUsd: number, profitLossPercent: number, dailyProfitLossUsd: number, openDate?: any | null, closeDate?: any | null, symbol: { __typename?: 'Symbol', name: string, symbol: string, symbolType: string, exchange: string, region: string, currency: string, quote: { __typename?: 'Quote', avgTotalVolume: number, calculationPrice: string, change: number, changePercent: number, companyName: string, close: number, closeSource: string, closeTime: number, currency: string, delayedPrice: number, delayedPriceTime: number, extendedPrice: number, extendedChange: number, extendedChangePercent: number, extendedPriceTime: number, high: number, highSource: string, highTime: number, iexAskPrice: number, iexAskSize: number, iexBidPrice: number, iexBidSize: number, iexClose: number, iexCloseTime: number, iexLastUpdated: number, iexOpen: number, iexOpenTime: number, iexRealtimePrice: number, iexRealtimeSize: number, iexMarketPercent: number, iexVolume: number, isUSMarketOpen: boolean, lastTradeTime: number, latestPrice: number, latestSource: string, latestTime: string, latestUpdate: number, latestVolume: number, low: number, lowTime: number, lowSource: string, marketCap: number, oddLotDelayedPrice: number, oddLotDelayedPriceTime: number, open: number, openSource: string, openTime: number, peRatio: number, previousClose: number, previousVolume: number, primaryExchange: string, symbol: string, week52High: number, week52Low: number, volume: number, ytdChange: number } } }> } } };

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


export type PortfolioQuery = { __typename?: 'Query', portfolio: { __typename?: 'Portfolio', _id: any, cash: number, name: string, description: string, totalValue: number, owner: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string> }, positions: Array<{ __typename?: 'Position', _id: any, marketValue: number, direction: PositionDirection, exposure: number, averagePrice: number, costBasis: number, brokerFees: number, positionSize: number, profitLossUsd: number, profitLossPercent: number, dailyProfitLossUsd: number, openDate?: any | null, closeDate?: any | null, symbol: { __typename?: 'Symbol', name: string, symbol: string, symbolType: string, exchange: string, region: string, currency: string, quote: { __typename?: 'Quote', avgTotalVolume: number, calculationPrice: string, change: number, changePercent: number, companyName: string, close: number, closeSource: string, closeTime: number, currency: string, delayedPrice: number, delayedPriceTime: number, extendedPrice: number, extendedChange: number, extendedChangePercent: number, extendedPriceTime: number, high: number, highSource: string, highTime: number, iexAskPrice: number, iexAskSize: number, iexBidPrice: number, iexBidSize: number, iexClose: number, iexCloseTime: number, iexLastUpdated: number, iexOpen: number, iexOpenTime: number, iexRealtimePrice: number, iexRealtimeSize: number, iexMarketPercent: number, iexVolume: number, isUSMarketOpen: boolean, lastTradeTime: number, latestPrice: number, latestSource: string, latestTime: string, latestUpdate: number, latestVolume: number, low: number, lowTime: number, lowSource: string, marketCap: number, oddLotDelayedPrice: number, oddLotDelayedPriceTime: number, open: number, openSource: string, openTime: number, peRatio: number, previousClose: number, previousVolume: number, primaryExchange: string, symbol: string, week52High: number, week52Low: number, volume: number, ytdChange: number } } }> } };

export type SearchSymbolsQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type SearchSymbolsQuery = { __typename?: 'Query', searchSymbols: Array<{ __typename?: 'Symbol', symbol: string, _id: any, name: string, exchange: string, exchangeName: string, region: string, symbolType: string, currency: string, quote: { __typename?: 'Quote', latestTime: string, latestPrice: number } }> };

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
  direction
  exposure
  averagePrice
  marketValue
  costBasis
  brokerFees
  positionSize
  profitLossUsd
  profitLossPercent
  dailyProfitLossUsd
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
    record {
      _id
      ...AllPortfolioData
    }
  }
}
    ${AllPortfolioDataFragmentDoc}`;
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