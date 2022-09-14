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

export type AddHoldingInput = {
  averagePrice: Scalars['Float'];
  brokerFees?: InputMaybe<Scalars['Float']>;
  currency: Scalars['String'];
  direction: HoldingDirection;
  quantity: Scalars['Float'];
  security: Scalars['ObjectId'];
  securityType: SecurityType;
  transactionDate?: InputMaybe<Scalars['DateTime']>;
};

export enum AscDesc {
  Asc = 'asc',
  Desc = 'desc'
}

export type Chart = {
  __typename?: 'Chart';
  change: Scalars['Float'];
  changeOverTime: Scalars['Float'];
  changePercent: Scalars['Float'];
  close: Scalars['Float'];
  date: Scalars['String'];
  fClose: Scalars['Float'];
  fHigh: Scalars['Float'];
  fLow: Scalars['Float'];
  fOpen: Scalars['Float'];
  fVolume: Scalars['Float'];
  high: Scalars['Float'];
  id: Scalars['String'];
  key: Scalars['String'];
  label: Scalars['String'];
  low: Scalars['Float'];
  marketChangeOverTime: Scalars['Float'];
  open: Scalars['Float'];
  subkey: Scalars['String'];
  symbol: Scalars['String'];
  uClose: Scalars['Float'];
  uHigh: Scalars['Float'];
  uLow: Scalars['Float'];
  uOpen: Scalars['Float'];
  uVolume: Scalars['Float'];
  updated: Scalars['Float'];
  volume: Scalars['Float'];
};

export type ChartPriceRangeOptions = {
  chartByDay?: InputMaybe<Scalars['Boolean']>;
  chartCloseOnly?: InputMaybe<Scalars['Boolean']>;
  chartInterval?: InputMaybe<Scalars['Float']>;
  chartLast?: InputMaybe<Scalars['Float']>;
  chartSimplify?: InputMaybe<Scalars['Boolean']>;
  displayPercent?: InputMaybe<Scalars['Float']>;
  includeToday?: InputMaybe<Scalars['Boolean']>;
  sort?: InputMaybe<AscDesc>;
};

export type CreateUserInput = {
  _id: Scalars['String'];
  displayName: Scalars['String'];
  emails?: InputMaybe<Array<Scalars['String']>>;
  photos?: InputMaybe<Array<Scalars['String']>>;
};

export enum HistoricalRange {
  Last2Years = 'Last2Years',
  Last3Months = 'Last3Months',
  Last5Days = 'Last5Days',
  Last5Days10MinuteIntervals = 'Last5Days10MinuteIntervals',
  Last5Years = 'Last5Years',
  Last6Months = 'Last6Months',
  LastMonth = 'LastMonth',
  LastMonth30MinuteIntervals = 'LastMonth30MinuteIntervals',
  LastYear = 'LastYear',
  YearToDate = 'YearToDate',
  Date = 'date',
  Dynamic = 'dynamic',
  Max = 'max'
}

export type Holding = {
  __typename?: 'Holding';
  _id: Scalars['ObjectId'];
  averagePrice?: Maybe<Scalars['Float']>;
  brokerFees?: Maybe<Scalars['Float']>;
  costBasis?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  currency: Scalars['String'];
  dailyProfitLossUsd?: Maybe<Scalars['Float']>;
  direction?: Maybe<HoldingDirection>;
  exposure: Scalars['Float'];
  importedSecurity?: Maybe<ImportedSecurity>;
  institutionValue?: Maybe<Scalars['Float']>;
  marketValue?: Maybe<Scalars['Float']>;
  plaidAccountId?: Maybe<Scalars['String']>;
  profitLossPercent?: Maybe<Scalars['Float']>;
  profitLossUsd?: Maybe<Scalars['Float']>;
  quantity: Scalars['Float'];
  security?: Maybe<Security>;
  securityType: SecurityType;
  source: HoldingSource;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export enum HoldingDirection {
  Long = 'long',
  Short = 'short'
}

export type HoldingFromDb = {
  __typename?: 'HoldingFromDb';
  _id: Scalars['ObjectId'];
  averagePrice?: Maybe<Scalars['Float']>;
  brokerFees?: Maybe<Scalars['Float']>;
  costBasis?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  currency: Scalars['String'];
  direction?: Maybe<HoldingDirection>;
  importedSecurity?: Maybe<ImportedSecurity>;
  institutionValue?: Maybe<Scalars['Float']>;
  plaidAccountId?: Maybe<Scalars['String']>;
  quantity: Scalars['Float'];
  security?: Maybe<Security>;
  securityType: SecurityType;
  source: HoldingSource;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export enum HoldingSource {
  Broker = 'broker',
  Direct = 'direct',
  Transactions = 'transactions'
}

export type ImportResponse = {
  __typename?: 'ImportResponse';
  importedIds: Array<Scalars['ObjectId']>;
};

export type ImportedSecurity = {
  __typename?: 'ImportedSecurity';
  close_price?: Maybe<Scalars['Float']>;
  close_price_as_of?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  cusip?: Maybe<Scalars['String']>;
  institution_id?: Maybe<Scalars['String']>;
  institution_security_id?: Maybe<Scalars['String']>;
  is_cash_equivalent?: Maybe<Scalars['Boolean']>;
  isin?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  proxy_security_id?: Maybe<Scalars['String']>;
  security_id: Scalars['String'];
  sedol?: Maybe<Scalars['String']>;
  ticker_symbol?: Maybe<Scalars['String']>;
  type?: Maybe<SecurityType>;
  unofficial_currency_code?: Maybe<Scalars['String']>;
  update_datetime?: Maybe<Scalars['String']>;
};

export type Institution = {
  __typename?: 'Institution';
  _id: Scalars['String'];
  logo?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  portfoliosAddHolding: PortfolioFromDb;
  portfoliosBeginImport: ImportResponse;
  portfoliosInitEmpty: RecordId;
  portfoliosRemoveHolding: Scalars['ObjectId'];
  portfoliosRemoveMultiple: RemoveMultipleResponse;
  portfoliosRemoveOne: RecordId;
  portfoliosUpdateOne: PortfolioFromDb;
  usersFindOrCreate: User;
  usersRemoveOne: User;
  usersUpdateOne: User;
};


export type MutationPortfoliosAddHoldingArgs = {
  _id: Scalars['ObjectId'];
  input: AddHoldingInput;
};


export type MutationPortfoliosBeginImportArgs = {
  publicToken: Scalars['String'];
};


export type MutationPortfoliosRemoveHoldingArgs = {
  holdingId: Scalars['ObjectId'];
  portfolioId: Scalars['ObjectId'];
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

export type PlaidAccount = {
  __typename?: 'PlaidAccount';
  account_id: Scalars['String'];
  balances: PlaidAccountBalance;
  name?: Maybe<Scalars['String']>;
  official_name?: Maybe<Scalars['String']>;
  subtype?: Maybe<Scalars['String']>;
  type?: Maybe<PlaidAccountType>;
};

export type PlaidAccountBalance = {
  __typename?: 'PlaidAccountBalance';
  available?: Maybe<Scalars['Float']>;
  current?: Maybe<Scalars['Float']>;
  iso_currency_code?: Maybe<Scalars['String']>;
  last_updated_datetime?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Float']>;
  unofficial_currency_code?: Maybe<Scalars['String']>;
};

export enum PlaidAccountType {
  Brokerage = 'brokerage',
  Credit = 'credit',
  Depository = 'depository',
  Investment = 'investment',
  Loan = 'loan',
  Other = 'other'
}

export type PlaidItem = {
  __typename?: 'PlaidItem';
  _id: Scalars['String'];
  accessToken?: Maybe<Scalars['String']>;
  error?: Maybe<PlaidItemError>;
  institution: Institution;
  lastWebhookTime: Scalars['DateTime'];
  owner: User;
};

export type PlaidItemError = {
  __typename?: 'PlaidItemError';
  displayMessage: Scalars['String'];
  documentationUrl: Scalars['String'];
  errorCode: Scalars['Float'];
  errorMessage: Scalars['String'];
  errorType: Scalars['String'];
  suggestedAction: Scalars['String'];
};

export type PopulatedHolding = {
  __typename?: 'PopulatedHolding';
  _id: Scalars['ObjectId'];
  averagePrice?: Maybe<Scalars['Float']>;
  brokerFees?: Maybe<Scalars['Float']>;
  costBasis?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  currency: Scalars['String'];
  direction?: Maybe<HoldingDirection>;
  importedSecurity?: Maybe<ImportedSecurity>;
  institutionValue?: Maybe<Scalars['Float']>;
  plaidAccountId?: Maybe<Scalars['String']>;
  quantity: Scalars['Float'];
  security?: Maybe<Security>;
  securityType: SecurityType;
  source: HoldingSource;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Portfolio = {
  __typename?: 'Portfolio';
  _id: Scalars['ObjectId'];
  cash: Scalars['Float'];
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  holdings: Array<Holding>;
  name: Scalars['String'];
  owner: User;
  plaidAccount?: Maybe<PlaidAccount>;
  plaidItem?: Maybe<PlaidItem>;
  private: Scalars['Boolean'];
  totalValue: Scalars['Float'];
  transactions: Array<Transaction>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PortfolioFromDb = {
  __typename?: 'PortfolioFromDb';
  _id: Scalars['ObjectId'];
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  holdings: Array<HoldingFromDb>;
  name: Scalars['String'];
  owner: User;
  plaidAccount?: Maybe<PlaidAccount>;
  plaidItem?: Maybe<PlaidItem>;
  private: Scalars['Boolean'];
  transactions: Array<TransactionFromDb>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PortfolioSummary = {
  __typename?: 'PortfolioSummary';
  _id: Scalars['ObjectId'];
  cash: Scalars['Float'];
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  owner: User;
  plaidAccount?: Maybe<PlaidAccount>;
  plaidItem?: Maybe<PlaidItem>;
  private: Scalars['Boolean'];
  top5Holdings: Array<Holding>;
  totalValue: Scalars['Float'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Query = {
  __typename?: 'Query';
  chartSecurityPrice: Array<Chart>;
  plaidLinkToken: Scalars['String'];
  portfoliosCreated: Array<PortfolioSummary>;
  portfoliosFindById: Portfolio;
  securitiesFindById: Security;
  securitiesSearch: Array<Security>;
  usersFindById: User;
};


export type QueryChartSecurityPriceArgs = {
  options?: InputMaybe<ChartPriceRangeOptions>;
  range: HistoricalRange;
  securityId: Scalars['ObjectId'];
};


export type QueryPortfoliosFindByIdArgs = {
  _id: Scalars['ObjectId'];
};


export type QuerySecuritiesFindByIdArgs = {
  _id: Scalars['ObjectId'];
};


export type QuerySecuritiesSearchArgs = {
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

export type Security = {
  __typename?: 'Security';
  _id: Scalars['ObjectId'];
  cik?: Maybe<Scalars['String']>;
  close_price?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  currency?: Maybe<Scalars['String']>;
  exchange?: Maybe<Scalars['String']>;
  exchangeName?: Maybe<Scalars['String']>;
  figi?: Maybe<Scalars['String']>;
  iexId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  quote?: Maybe<Quote>;
  region?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  type: SecurityType;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export enum SecurityType {
  Cash = 'cash',
  Cryptocurrency = 'cryptocurrency',
  Derivative = 'derivative',
  Equity = 'equity',
  Etf = 'etf',
  FixedIncome = 'fixed_income',
  Loan = 'loan',
  MutualFund = 'mutual_fund',
  Other = 'other'
}

export type Transaction = {
  __typename?: 'Transaction';
  _id: Scalars['ObjectId'];
  amount: Scalars['Float'];
  createdBy?: Maybe<User>;
  currency: Scalars['String'];
  date: Scalars['DateTime'];
  fees: Scalars['Float'];
  importedSecurity: ImportedSecurity;
  name: Scalars['String'];
  /** This is the account_id from plaid */
  plaidAccountId: Scalars['String'];
  /** This is the transaction_id from plaid */
  plaidTransactionId: Scalars['String'];
  price: Scalars['Float'];
  quantity: Scalars['Float'];
  security?: Maybe<Security>;
  securityType: SecurityType;
  subType: TransactionSubtype;
  type: TransactionType;
};

export type TransactionFromDb = {
  __typename?: 'TransactionFromDb';
  _id: Scalars['ObjectId'];
  amount: Scalars['Float'];
  createdBy?: Maybe<User>;
  currency: Scalars['String'];
  date: Scalars['DateTime'];
  fees: Scalars['Float'];
  importedSecurity: ImportedSecurity;
  name: Scalars['String'];
  /** This is the account_id from plaid */
  plaidAccountId: Scalars['String'];
  /** This is the transaction_id from plaid */
  plaidTransactionId: Scalars['String'];
  price: Scalars['Float'];
  quantity: Scalars['Float'];
  security?: Maybe<Security>;
  securityType: SecurityType;
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
  Request = 'Request',
  ReturnOfPrincipal = 'ReturnOfPrincipal',
  Sell = 'Sell',
  SellShort = 'SellShort',
  Send = 'Send',
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
  createdAt?: Maybe<Scalars['DateTime']>;
  displayName: Scalars['String'];
  emails?: Maybe<Array<Scalars['String']>>;
  photos: Array<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ChartSecurityPriceQueryVariables = Exact<{
  range: HistoricalRange;
  securityId: Scalars['ObjectId'];
  options?: InputMaybe<ChartPriceRangeOptions>;
}>;


export type ChartSecurityPriceQuery = { __typename?: 'Query', chartSecurityPrice: Array<{ __typename?: 'Chart', change: number, changeOverTime: number, changePercent: number, close: number, date: string, fClose: number, fHigh: number, fLow: number, fOpen: number, fVolume: number, high: number, id: string, key: string, label: string, low: number, marketChangeOverTime: number, open: number, subkey: string, symbol: string, uClose: number, uHigh: number, uLow: number, uOpen: number, uVolume: number, updated: number, volume: number }> };

export type PlaidLinkTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type PlaidLinkTokenQuery = { __typename?: 'Query', plaidLinkToken: string };

export type AllHoldingDataFragment = { __typename?: 'Holding', _id: any, marketValue?: number | null, exposure: number, profitLossUsd?: number | null, profitLossPercent?: number | null, dailyProfitLossUsd?: number | null, averagePrice?: number | null, costBasis?: number | null, brokerFees?: number | null, institutionValue?: number | null, direction?: HoldingDirection | null, quantity: number, securityType: SecurityType, source: HoldingSource, currency: string, importedSecurity?: { __typename?: 'ImportedSecurity', close_price?: number | null, name?: string | null, ticker_symbol?: string | null, currency?: string | null, type?: SecurityType | null } | null, security?: { __typename?: 'Security', cik?: string | null, createdAt?: any | null, currency?: string | null, exchange?: string | null, exchangeName?: string | null, figi?: string | null, iexId?: string | null, name?: string | null, region?: string | null, symbol?: string | null, updatedAt?: any | null, quote?: { __typename?: 'Quote', avgTotalVolume?: number | null, calculationPrice?: string | null, change?: number | null, changePercent?: number | null, companyName: string, close?: number | null, closeSource?: string | null, closeTime?: number | null, currency?: string | null, delayedPrice?: number | null, delayedPriceTime?: number | null, extendedPrice?: number | null, extendedChange?: number | null, extendedChangePercent?: number | null, extendedPriceTime?: number | null, high?: number | null, highSource?: string | null, highTime?: number | null, iexAskPrice?: number | null, iexAskSize?: number | null, iexBidPrice?: number | null, iexBidSize?: number | null, iexClose?: number | null, iexCloseTime?: number | null, iexLastUpdated?: number | null, iexOpen?: number | null, iexOpenTime?: number | null, iexRealtimePrice?: number | null, iexRealtimeSize?: number | null, iexMarketPercent?: number | null, iexVolume?: number | null, isUSMarketOpen?: boolean | null, lastTradeTime?: number | null, latestPrice?: number | null, latestSource?: string | null, latestTime?: string | null, latestUpdate?: number | null, latestVolume?: number | null, low?: number | null, lowTime?: number | null, lowSource?: string | null, marketCap?: number | null, oddLotDelayedPrice?: number | null, oddLotDelayedPriceTime?: number | null, open?: number | null, openSource?: string | null, openTime?: number | null, peRatio?: number | null, previousClose?: number | null, previousVolume?: number | null, primaryExchange?: string | null, symbol?: string | null, week52High?: number | null, week52Low?: number | null, volume?: number | null, ytdChange?: number | null } | null } | null };

export type FullPlaidAccountFragment = { __typename?: 'PlaidAccount', type?: PlaidAccountType | null, name?: string | null, subtype?: string | null, official_name?: string | null, account_id: string, balances: { __typename?: 'PlaidAccountBalance', current?: number | null, available?: number | null } };

export type PortfolioSummaryFragment = { __typename?: 'Portfolio', _id: any, cash: number, name: string, description?: string | null, private: boolean, createdAt?: any | null, updatedAt?: any | null, totalValue: number, owner: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string>, createdAt?: any | null, updatedAt?: any | null }, plaidAccount?: { __typename?: 'PlaidAccount', type?: PlaidAccountType | null, name?: string | null, subtype?: string | null, official_name?: string | null, account_id: string, balances: { __typename?: 'PlaidAccountBalance', current?: number | null, available?: number | null } } | null };

export type PortfolioTransactionsFragment = { __typename?: 'Portfolio', transactions: Array<{ __typename?: 'Transaction', _id: any, name: string, date: any, currency: string, quantity: number, amount: number, fees: number, price: number, type: TransactionType, subType: TransactionSubtype, security?: { __typename?: 'Security', cik?: string | null, createdAt?: any | null, currency?: string | null, exchange?: string | null, exchangeName?: string | null, figi?: string | null, iexId?: string | null, name?: string | null, region?: string | null, symbol?: string | null, updatedAt?: any | null, quote?: { __typename?: 'Quote', avgTotalVolume?: number | null, calculationPrice?: string | null, change?: number | null, changePercent?: number | null, companyName: string, close?: number | null, closeSource?: string | null, closeTime?: number | null, currency?: string | null, delayedPrice?: number | null, delayedPriceTime?: number | null, extendedPrice?: number | null, extendedChange?: number | null, extendedChangePercent?: number | null, extendedPriceTime?: number | null, high?: number | null, highSource?: string | null, highTime?: number | null, iexAskPrice?: number | null, iexAskSize?: number | null, iexBidPrice?: number | null, iexBidSize?: number | null, iexClose?: number | null, iexCloseTime?: number | null, iexLastUpdated?: number | null, iexOpen?: number | null, iexOpenTime?: number | null, iexRealtimePrice?: number | null, iexRealtimeSize?: number | null, iexMarketPercent?: number | null, iexVolume?: number | null, isUSMarketOpen?: boolean | null, lastTradeTime?: number | null, latestPrice?: number | null, latestSource?: string | null, latestTime?: string | null, latestUpdate?: number | null, latestVolume?: number | null, low?: number | null, lowTime?: number | null, lowSource?: string | null, marketCap?: number | null, oddLotDelayedPrice?: number | null, oddLotDelayedPriceTime?: number | null, open?: number | null, openSource?: string | null, openTime?: number | null, peRatio?: number | null, previousClose?: number | null, previousVolume?: number | null, primaryExchange?: string | null, symbol?: string | null, week52High?: number | null, week52Low?: number | null, volume?: number | null, ytdChange?: number | null } | null } | null, importedSecurity: { __typename?: 'ImportedSecurity', close_price?: number | null, name?: string | null, ticker_symbol?: string | null, currency?: string | null, type?: SecurityType | null } }> };

export type PortfolioHoldingsFragment = { __typename?: 'Portfolio', holdings: Array<{ __typename?: 'Holding', _id: any, marketValue?: number | null, exposure: number, profitLossUsd?: number | null, profitLossPercent?: number | null, dailyProfitLossUsd?: number | null, averagePrice?: number | null, costBasis?: number | null, brokerFees?: number | null, institutionValue?: number | null, direction?: HoldingDirection | null, quantity: number, securityType: SecurityType, source: HoldingSource, currency: string, importedSecurity?: { __typename?: 'ImportedSecurity', close_price?: number | null, name?: string | null, ticker_symbol?: string | null, currency?: string | null, type?: SecurityType | null } | null, security?: { __typename?: 'Security', cik?: string | null, createdAt?: any | null, currency?: string | null, exchange?: string | null, exchangeName?: string | null, figi?: string | null, iexId?: string | null, name?: string | null, region?: string | null, symbol?: string | null, updatedAt?: any | null, quote?: { __typename?: 'Quote', avgTotalVolume?: number | null, calculationPrice?: string | null, change?: number | null, changePercent?: number | null, companyName: string, close?: number | null, closeSource?: string | null, closeTime?: number | null, currency?: string | null, delayedPrice?: number | null, delayedPriceTime?: number | null, extendedPrice?: number | null, extendedChange?: number | null, extendedChangePercent?: number | null, extendedPriceTime?: number | null, high?: number | null, highSource?: string | null, highTime?: number | null, iexAskPrice?: number | null, iexAskSize?: number | null, iexBidPrice?: number | null, iexBidSize?: number | null, iexClose?: number | null, iexCloseTime?: number | null, iexLastUpdated?: number | null, iexOpen?: number | null, iexOpenTime?: number | null, iexRealtimePrice?: number | null, iexRealtimeSize?: number | null, iexMarketPercent?: number | null, iexVolume?: number | null, isUSMarketOpen?: boolean | null, lastTradeTime?: number | null, latestPrice?: number | null, latestSource?: string | null, latestTime?: string | null, latestUpdate?: number | null, latestVolume?: number | null, low?: number | null, lowTime?: number | null, lowSource?: string | null, marketCap?: number | null, oddLotDelayedPrice?: number | null, oddLotDelayedPriceTime?: number | null, open?: number | null, openSource?: string | null, openTime?: number | null, peRatio?: number | null, previousClose?: number | null, previousVolume?: number | null, primaryExchange?: string | null, symbol?: string | null, week52High?: number | null, week52Low?: number | null, volume?: number | null, ytdChange?: number | null } | null } | null }> };

export type AllPortfolioDataFragment = { __typename?: 'Portfolio', _id: any, cash: number, name: string, description?: string | null, private: boolean, createdAt?: any | null, updatedAt?: any | null, totalValue: number, owner: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string>, createdAt?: any | null, updatedAt?: any | null }, plaidAccount?: { __typename?: 'PlaidAccount', type?: PlaidAccountType | null, name?: string | null, subtype?: string | null, official_name?: string | null, account_id: string, balances: { __typename?: 'PlaidAccountBalance', current?: number | null, available?: number | null } } | null, holdings: Array<{ __typename?: 'Holding', _id: any, marketValue?: number | null, exposure: number, profitLossUsd?: number | null, profitLossPercent?: number | null, dailyProfitLossUsd?: number | null, averagePrice?: number | null, costBasis?: number | null, brokerFees?: number | null, institutionValue?: number | null, direction?: HoldingDirection | null, quantity: number, securityType: SecurityType, source: HoldingSource, currency: string, importedSecurity?: { __typename?: 'ImportedSecurity', close_price?: number | null, name?: string | null, ticker_symbol?: string | null, currency?: string | null, type?: SecurityType | null } | null, security?: { __typename?: 'Security', cik?: string | null, createdAt?: any | null, currency?: string | null, exchange?: string | null, exchangeName?: string | null, figi?: string | null, iexId?: string | null, name?: string | null, region?: string | null, symbol?: string | null, updatedAt?: any | null, quote?: { __typename?: 'Quote', avgTotalVolume?: number | null, calculationPrice?: string | null, change?: number | null, changePercent?: number | null, companyName: string, close?: number | null, closeSource?: string | null, closeTime?: number | null, currency?: string | null, delayedPrice?: number | null, delayedPriceTime?: number | null, extendedPrice?: number | null, extendedChange?: number | null, extendedChangePercent?: number | null, extendedPriceTime?: number | null, high?: number | null, highSource?: string | null, highTime?: number | null, iexAskPrice?: number | null, iexAskSize?: number | null, iexBidPrice?: number | null, iexBidSize?: number | null, iexClose?: number | null, iexCloseTime?: number | null, iexLastUpdated?: number | null, iexOpen?: number | null, iexOpenTime?: number | null, iexRealtimePrice?: number | null, iexRealtimeSize?: number | null, iexMarketPercent?: number | null, iexVolume?: number | null, isUSMarketOpen?: boolean | null, lastTradeTime?: number | null, latestPrice?: number | null, latestSource?: string | null, latestTime?: string | null, latestUpdate?: number | null, latestVolume?: number | null, low?: number | null, lowTime?: number | null, lowSource?: string | null, marketCap?: number | null, oddLotDelayedPrice?: number | null, oddLotDelayedPriceTime?: number | null, open?: number | null, openSource?: string | null, openTime?: number | null, peRatio?: number | null, previousClose?: number | null, previousVolume?: number | null, primaryExchange?: string | null, symbol?: string | null, week52High?: number | null, week52Low?: number | null, volume?: number | null, ytdChange?: number | null } | null } | null }>, transactions: Array<{ __typename?: 'Transaction', _id: any, name: string, date: any, currency: string, quantity: number, amount: number, fees: number, price: number, type: TransactionType, subType: TransactionSubtype, security?: { __typename?: 'Security', cik?: string | null, createdAt?: any | null, currency?: string | null, exchange?: string | null, exchangeName?: string | null, figi?: string | null, iexId?: string | null, name?: string | null, region?: string | null, symbol?: string | null, updatedAt?: any | null, quote?: { __typename?: 'Quote', avgTotalVolume?: number | null, calculationPrice?: string | null, change?: number | null, changePercent?: number | null, companyName: string, close?: number | null, closeSource?: string | null, closeTime?: number | null, currency?: string | null, delayedPrice?: number | null, delayedPriceTime?: number | null, extendedPrice?: number | null, extendedChange?: number | null, extendedChangePercent?: number | null, extendedPriceTime?: number | null, high?: number | null, highSource?: string | null, highTime?: number | null, iexAskPrice?: number | null, iexAskSize?: number | null, iexBidPrice?: number | null, iexBidSize?: number | null, iexClose?: number | null, iexCloseTime?: number | null, iexLastUpdated?: number | null, iexOpen?: number | null, iexOpenTime?: number | null, iexRealtimePrice?: number | null, iexRealtimeSize?: number | null, iexMarketPercent?: number | null, iexVolume?: number | null, isUSMarketOpen?: boolean | null, lastTradeTime?: number | null, latestPrice?: number | null, latestSource?: string | null, latestTime?: string | null, latestUpdate?: number | null, latestVolume?: number | null, low?: number | null, lowTime?: number | null, lowSource?: string | null, marketCap?: number | null, oddLotDelayedPrice?: number | null, oddLotDelayedPriceTime?: number | null, open?: number | null, openSource?: string | null, openTime?: number | null, peRatio?: number | null, previousClose?: number | null, previousVolume?: number | null, primaryExchange?: string | null, symbol?: string | null, week52High?: number | null, week52Low?: number | null, volume?: number | null, ytdChange?: number | null } | null } | null, importedSecurity: { __typename?: 'ImportedSecurity', close_price?: number | null, name?: string | null, ticker_symbol?: string | null, currency?: string | null, type?: SecurityType | null } }> };

export type AllTransactionDataFragment = { __typename?: 'Transaction', _id: any, name: string, date: any, currency: string, quantity: number, amount: number, fees: number, price: number, type: TransactionType, subType: TransactionSubtype, security?: { __typename?: 'Security', cik?: string | null, createdAt?: any | null, currency?: string | null, exchange?: string | null, exchangeName?: string | null, figi?: string | null, iexId?: string | null, name?: string | null, region?: string | null, symbol?: string | null, updatedAt?: any | null, quote?: { __typename?: 'Quote', avgTotalVolume?: number | null, calculationPrice?: string | null, change?: number | null, changePercent?: number | null, companyName: string, close?: number | null, closeSource?: string | null, closeTime?: number | null, currency?: string | null, delayedPrice?: number | null, delayedPriceTime?: number | null, extendedPrice?: number | null, extendedChange?: number | null, extendedChangePercent?: number | null, extendedPriceTime?: number | null, high?: number | null, highSource?: string | null, highTime?: number | null, iexAskPrice?: number | null, iexAskSize?: number | null, iexBidPrice?: number | null, iexBidSize?: number | null, iexClose?: number | null, iexCloseTime?: number | null, iexLastUpdated?: number | null, iexOpen?: number | null, iexOpenTime?: number | null, iexRealtimePrice?: number | null, iexRealtimeSize?: number | null, iexMarketPercent?: number | null, iexVolume?: number | null, isUSMarketOpen?: boolean | null, lastTradeTime?: number | null, latestPrice?: number | null, latestSource?: string | null, latestTime?: string | null, latestUpdate?: number | null, latestVolume?: number | null, low?: number | null, lowTime?: number | null, lowSource?: string | null, marketCap?: number | null, oddLotDelayedPrice?: number | null, oddLotDelayedPriceTime?: number | null, open?: number | null, openSource?: string | null, openTime?: number | null, peRatio?: number | null, previousClose?: number | null, previousVolume?: number | null, primaryExchange?: string | null, symbol?: string | null, week52High?: number | null, week52Low?: number | null, volume?: number | null, ytdChange?: number | null } | null } | null, importedSecurity: { __typename?: 'ImportedSecurity', close_price?: number | null, name?: string | null, ticker_symbol?: string | null, currency?: string | null, type?: SecurityType | null } };

export type PortfoliosAddHoldingMutationVariables = Exact<{
  _id: Scalars['ObjectId'];
  input: AddHoldingInput;
}>;


export type PortfoliosAddHoldingMutation = { __typename?: 'Mutation', portfoliosAddHolding: { __typename?: 'PortfolioFromDb', _id: any, holdings: Array<{ __typename?: 'HoldingFromDb', averagePrice?: number | null, brokerFees?: number | null, costBasis?: number | null, quantity: number }> } };

export type PortfoliosBeginImportMutationVariables = Exact<{
  publicToken: Scalars['String'];
}>;


export type PortfoliosBeginImportMutation = { __typename?: 'Mutation', portfoliosBeginImport: { __typename?: 'ImportResponse', importedIds: Array<any> } };

export type PortfoliosCreatedQueryVariables = Exact<{ [key: string]: never; }>;


export type PortfoliosCreatedQuery = { __typename?: 'Query', portfoliosCreated: Array<{ __typename?: 'PortfolioSummary', _id: any, name: string, cash: number, private: boolean, description?: string | null, updatedAt?: any | null, createdAt?: any | null, totalValue: number, owner: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string>, createdAt?: any | null, updatedAt?: any | null }, plaidAccount?: { __typename?: 'PlaidAccount', type?: PlaidAccountType | null, name?: string | null, subtype?: string | null, official_name?: string | null, account_id: string, balances: { __typename?: 'PlaidAccountBalance', current?: number | null, available?: number | null } } | null, top5Holdings: Array<{ __typename?: 'Holding', costBasis?: number | null, exposure: number, securityType: SecurityType, marketValue?: number | null, importedSecurity?: { __typename?: 'ImportedSecurity', close_price?: number | null, name?: string | null, ticker_symbol?: string | null, currency?: string | null, type?: SecurityType | null } | null, security?: { __typename?: 'Security', _id: any, name?: string | null, symbol?: string | null, exchangeName?: string | null, region?: string | null, quote?: { __typename?: 'Quote', latestPrice?: number | null } | null } | null }> }> };

export type PortfoliosFindByIdQueryVariables = Exact<{
  _id: Scalars['ObjectId'];
}>;


export type PortfoliosFindByIdQuery = { __typename?: 'Query', portfoliosFindById: { __typename?: 'Portfolio', _id: any, cash: number, name: string, description?: string | null, private: boolean, createdAt?: any | null, updatedAt?: any | null, totalValue: number, owner: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string>, createdAt?: any | null, updatedAt?: any | null }, plaidAccount?: { __typename?: 'PlaidAccount', type?: PlaidAccountType | null, name?: string | null, subtype?: string | null, official_name?: string | null, account_id: string, balances: { __typename?: 'PlaidAccountBalance', current?: number | null, available?: number | null } } | null, holdings: Array<{ __typename?: 'Holding', _id: any, marketValue?: number | null, exposure: number, profitLossUsd?: number | null, profitLossPercent?: number | null, dailyProfitLossUsd?: number | null, averagePrice?: number | null, costBasis?: number | null, brokerFees?: number | null, institutionValue?: number | null, direction?: HoldingDirection | null, quantity: number, securityType: SecurityType, source: HoldingSource, currency: string, importedSecurity?: { __typename?: 'ImportedSecurity', close_price?: number | null, name?: string | null, ticker_symbol?: string | null, currency?: string | null, type?: SecurityType | null } | null, security?: { __typename?: 'Security', cik?: string | null, createdAt?: any | null, currency?: string | null, exchange?: string | null, exchangeName?: string | null, figi?: string | null, iexId?: string | null, name?: string | null, region?: string | null, symbol?: string | null, updatedAt?: any | null, quote?: { __typename?: 'Quote', avgTotalVolume?: number | null, calculationPrice?: string | null, change?: number | null, changePercent?: number | null, companyName: string, close?: number | null, closeSource?: string | null, closeTime?: number | null, currency?: string | null, delayedPrice?: number | null, delayedPriceTime?: number | null, extendedPrice?: number | null, extendedChange?: number | null, extendedChangePercent?: number | null, extendedPriceTime?: number | null, high?: number | null, highSource?: string | null, highTime?: number | null, iexAskPrice?: number | null, iexAskSize?: number | null, iexBidPrice?: number | null, iexBidSize?: number | null, iexClose?: number | null, iexCloseTime?: number | null, iexLastUpdated?: number | null, iexOpen?: number | null, iexOpenTime?: number | null, iexRealtimePrice?: number | null, iexRealtimeSize?: number | null, iexMarketPercent?: number | null, iexVolume?: number | null, isUSMarketOpen?: boolean | null, lastTradeTime?: number | null, latestPrice?: number | null, latestSource?: string | null, latestTime?: string | null, latestUpdate?: number | null, latestVolume?: number | null, low?: number | null, lowTime?: number | null, lowSource?: string | null, marketCap?: number | null, oddLotDelayedPrice?: number | null, oddLotDelayedPriceTime?: number | null, open?: number | null, openSource?: string | null, openTime?: number | null, peRatio?: number | null, previousClose?: number | null, previousVolume?: number | null, primaryExchange?: string | null, symbol?: string | null, week52High?: number | null, week52Low?: number | null, volume?: number | null, ytdChange?: number | null } | null } | null }>, transactions: Array<{ __typename?: 'Transaction', _id: any, name: string, date: any, currency: string, quantity: number, amount: number, fees: number, price: number, type: TransactionType, subType: TransactionSubtype, security?: { __typename?: 'Security', cik?: string | null, createdAt?: any | null, currency?: string | null, exchange?: string | null, exchangeName?: string | null, figi?: string | null, iexId?: string | null, name?: string | null, region?: string | null, symbol?: string | null, updatedAt?: any | null, quote?: { __typename?: 'Quote', avgTotalVolume?: number | null, calculationPrice?: string | null, change?: number | null, changePercent?: number | null, companyName: string, close?: number | null, closeSource?: string | null, closeTime?: number | null, currency?: string | null, delayedPrice?: number | null, delayedPriceTime?: number | null, extendedPrice?: number | null, extendedChange?: number | null, extendedChangePercent?: number | null, extendedPriceTime?: number | null, high?: number | null, highSource?: string | null, highTime?: number | null, iexAskPrice?: number | null, iexAskSize?: number | null, iexBidPrice?: number | null, iexBidSize?: number | null, iexClose?: number | null, iexCloseTime?: number | null, iexLastUpdated?: number | null, iexOpen?: number | null, iexOpenTime?: number | null, iexRealtimePrice?: number | null, iexRealtimeSize?: number | null, iexMarketPercent?: number | null, iexVolume?: number | null, isUSMarketOpen?: boolean | null, lastTradeTime?: number | null, latestPrice?: number | null, latestSource?: string | null, latestTime?: string | null, latestUpdate?: number | null, latestVolume?: number | null, low?: number | null, lowTime?: number | null, lowSource?: string | null, marketCap?: number | null, oddLotDelayedPrice?: number | null, oddLotDelayedPriceTime?: number | null, open?: number | null, openSource?: string | null, openTime?: number | null, peRatio?: number | null, previousClose?: number | null, previousVolume?: number | null, primaryExchange?: string | null, symbol?: string | null, week52High?: number | null, week52Low?: number | null, volume?: number | null, ytdChange?: number | null } | null } | null, importedSecurity: { __typename?: 'ImportedSecurity', close_price?: number | null, name?: string | null, ticker_symbol?: string | null, currency?: string | null, type?: SecurityType | null } }> } };

export type PortfoliosInitEmptyMutationVariables = Exact<{ [key: string]: never; }>;


export type PortfoliosInitEmptyMutation = { __typename?: 'Mutation', portfoliosInitEmpty: { __typename?: 'RecordId', _id: string } };

export type PortfoliosRemoveHoldingMutationVariables = Exact<{
  portfolioId: Scalars['ObjectId'];
  holdingId: Scalars['ObjectId'];
}>;


export type PortfoliosRemoveHoldingMutation = { __typename?: 'Mutation', portfoliosRemoveHolding: any };

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


export type PortfoliosUpdateOneMutation = { __typename?: 'Mutation', portfoliosUpdateOne: { __typename?: 'PortfolioFromDb', _id: any, createdAt?: any | null, description?: string | null, name: string, private: boolean, updatedAt?: any | null } };

export type AllQuoteDataFragment = { __typename?: 'Quote', avgTotalVolume?: number | null, calculationPrice?: string | null, change?: number | null, changePercent?: number | null, companyName: string, close?: number | null, closeSource?: string | null, closeTime?: number | null, currency?: string | null, delayedPrice?: number | null, delayedPriceTime?: number | null, extendedPrice?: number | null, extendedChange?: number | null, extendedChangePercent?: number | null, extendedPriceTime?: number | null, high?: number | null, highSource?: string | null, highTime?: number | null, iexAskPrice?: number | null, iexAskSize?: number | null, iexBidPrice?: number | null, iexBidSize?: number | null, iexClose?: number | null, iexCloseTime?: number | null, iexLastUpdated?: number | null, iexOpen?: number | null, iexOpenTime?: number | null, iexRealtimePrice?: number | null, iexRealtimeSize?: number | null, iexMarketPercent?: number | null, iexVolume?: number | null, isUSMarketOpen?: boolean | null, lastTradeTime?: number | null, latestPrice?: number | null, latestSource?: string | null, latestTime?: string | null, latestUpdate?: number | null, latestVolume?: number | null, low?: number | null, lowTime?: number | null, lowSource?: string | null, marketCap?: number | null, oddLotDelayedPrice?: number | null, oddLotDelayedPriceTime?: number | null, open?: number | null, openSource?: string | null, openTime?: number | null, peRatio?: number | null, previousClose?: number | null, previousVolume?: number | null, primaryExchange?: string | null, symbol?: string | null, week52High?: number | null, week52Low?: number | null, volume?: number | null, ytdChange?: number | null };

export type AllSecurityDataFragment = { __typename?: 'Security', cik?: string | null, createdAt?: any | null, currency?: string | null, exchange?: string | null, exchangeName?: string | null, figi?: string | null, iexId?: string | null, name?: string | null, region?: string | null, symbol?: string | null, updatedAt?: any | null, quote?: { __typename?: 'Quote', avgTotalVolume?: number | null, calculationPrice?: string | null, change?: number | null, changePercent?: number | null, companyName: string, close?: number | null, closeSource?: string | null, closeTime?: number | null, currency?: string | null, delayedPrice?: number | null, delayedPriceTime?: number | null, extendedPrice?: number | null, extendedChange?: number | null, extendedChangePercent?: number | null, extendedPriceTime?: number | null, high?: number | null, highSource?: string | null, highTime?: number | null, iexAskPrice?: number | null, iexAskSize?: number | null, iexBidPrice?: number | null, iexBidSize?: number | null, iexClose?: number | null, iexCloseTime?: number | null, iexLastUpdated?: number | null, iexOpen?: number | null, iexOpenTime?: number | null, iexRealtimePrice?: number | null, iexRealtimeSize?: number | null, iexMarketPercent?: number | null, iexVolume?: number | null, isUSMarketOpen?: boolean | null, lastTradeTime?: number | null, latestPrice?: number | null, latestSource?: string | null, latestTime?: string | null, latestUpdate?: number | null, latestVolume?: number | null, low?: number | null, lowTime?: number | null, lowSource?: string | null, marketCap?: number | null, oddLotDelayedPrice?: number | null, oddLotDelayedPriceTime?: number | null, open?: number | null, openSource?: string | null, openTime?: number | null, peRatio?: number | null, previousClose?: number | null, previousVolume?: number | null, primaryExchange?: string | null, symbol?: string | null, week52High?: number | null, week52Low?: number | null, volume?: number | null, ytdChange?: number | null } | null };

export type AllImportedSecurityDataFragment = { __typename?: 'ImportedSecurity', close_price?: number | null, name?: string | null, ticker_symbol?: string | null, currency?: string | null, type?: SecurityType | null };

export type SecuritySummaryFragment = { __typename?: 'Security', _id: any, name?: string | null, symbol?: string | null, exchangeName?: string | null, region?: string | null, quote?: { __typename?: 'Quote', latestPrice?: number | null } | null };

export type SecuritiesFindByIdQueryVariables = Exact<{
  _id: Scalars['ObjectId'];
}>;


export type SecuritiesFindByIdQuery = { __typename?: 'Query', securitiesFindById: { __typename?: 'Security', _id: any, cik?: string | null, createdAt?: any | null, currency?: string | null, exchange?: string | null, exchangeName?: string | null, figi?: string | null, iexId?: string | null, name?: string | null, region?: string | null, symbol?: string | null, updatedAt?: any | null, quote?: { __typename?: 'Quote', avgTotalVolume?: number | null, calculationPrice?: string | null, change?: number | null, changePercent?: number | null, companyName: string, close?: number | null, closeSource?: string | null, closeTime?: number | null, currency?: string | null, delayedPrice?: number | null, delayedPriceTime?: number | null, extendedPrice?: number | null, extendedChange?: number | null, extendedChangePercent?: number | null, extendedPriceTime?: number | null, high?: number | null, highSource?: string | null, highTime?: number | null, iexAskPrice?: number | null, iexAskSize?: number | null, iexBidPrice?: number | null, iexBidSize?: number | null, iexClose?: number | null, iexCloseTime?: number | null, iexLastUpdated?: number | null, iexOpen?: number | null, iexOpenTime?: number | null, iexRealtimePrice?: number | null, iexRealtimeSize?: number | null, iexMarketPercent?: number | null, iexVolume?: number | null, isUSMarketOpen?: boolean | null, lastTradeTime?: number | null, latestPrice?: number | null, latestSource?: string | null, latestTime?: string | null, latestUpdate?: number | null, latestVolume?: number | null, low?: number | null, lowTime?: number | null, lowSource?: string | null, marketCap?: number | null, oddLotDelayedPrice?: number | null, oddLotDelayedPriceTime?: number | null, open?: number | null, openSource?: string | null, openTime?: number | null, peRatio?: number | null, previousClose?: number | null, previousVolume?: number | null, primaryExchange?: string | null, symbol?: string | null, week52High?: number | null, week52Low?: number | null, volume?: number | null, ytdChange?: number | null } | null } };

export type SecuritiesSearchQueryVariables = Exact<{
  searchTerm: Scalars['String'];
}>;


export type SecuritiesSearchQuery = { __typename?: 'Query', securitiesSearch: Array<{ __typename?: 'Security', _id: any, cik?: string | null, createdAt?: any | null, currency?: string | null, exchange?: string | null, exchangeName?: string | null, figi?: string | null, iexId?: string | null, name?: string | null, region?: string | null, symbol?: string | null, updatedAt?: any | null, quote?: { __typename?: 'Quote', avgTotalVolume?: number | null, calculationPrice?: string | null, change?: number | null, changePercent?: number | null, companyName: string, close?: number | null, closeSource?: string | null, closeTime?: number | null, currency?: string | null, delayedPrice?: number | null, delayedPriceTime?: number | null, extendedPrice?: number | null, extendedChange?: number | null, extendedChangePercent?: number | null, extendedPriceTime?: number | null, high?: number | null, highSource?: string | null, highTime?: number | null, iexAskPrice?: number | null, iexAskSize?: number | null, iexBidPrice?: number | null, iexBidSize?: number | null, iexClose?: number | null, iexCloseTime?: number | null, iexLastUpdated?: number | null, iexOpen?: number | null, iexOpenTime?: number | null, iexRealtimePrice?: number | null, iexRealtimeSize?: number | null, iexMarketPercent?: number | null, iexVolume?: number | null, isUSMarketOpen?: boolean | null, lastTradeTime?: number | null, latestPrice?: number | null, latestSource?: string | null, latestTime?: string | null, latestUpdate?: number | null, latestVolume?: number | null, low?: number | null, lowTime?: number | null, lowSource?: string | null, marketCap?: number | null, oddLotDelayedPrice?: number | null, oddLotDelayedPriceTime?: number | null, open?: number | null, openSource?: string | null, openTime?: number | null, peRatio?: number | null, previousClose?: number | null, previousVolume?: number | null, primaryExchange?: string | null, symbol?: string | null, week52High?: number | null, week52Low?: number | null, volume?: number | null, ytdChange?: number | null } | null }> };

export type FullUserFragment = { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string>, createdAt?: any | null, updatedAt?: any | null };

export type UsersFindByIdQueryVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type UsersFindByIdQuery = { __typename?: 'Query', usersFindById: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string>, createdAt?: any | null, updatedAt?: any | null } };

export type UsersFindOrCreateMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type UsersFindOrCreateMutation = { __typename?: 'Mutation', usersFindOrCreate: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string>, createdAt?: any | null, updatedAt?: any | null } };

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
export const FullPlaidAccountFragmentDoc = gql`
    fragment FullPlaidAccount on PlaidAccount {
  type
  name
  subtype
  official_name
  account_id
  balances {
    current
    available
  }
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
  plaidAccount {
    ...FullPlaidAccount
  }
  totalValue
}
    ${FullUserFragmentDoc}
${FullPlaidAccountFragmentDoc}`;
export const AllImportedSecurityDataFragmentDoc = gql`
    fragment AllImportedSecurityData on ImportedSecurity {
  close_price
  name
  ticker_symbol
  currency
  type
}
    `;
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
export const AllSecurityDataFragmentDoc = gql`
    fragment AllSecurityData on Security {
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
  quote {
    ...AllQuoteData
  }
  updatedAt
}
    ${AllQuoteDataFragmentDoc}`;
export const AllHoldingDataFragmentDoc = gql`
    fragment AllHoldingData on Holding {
  _id
  marketValue
  exposure
  profitLossUsd
  profitLossPercent
  dailyProfitLossUsd
  averagePrice
  costBasis
  brokerFees
  institutionValue
  direction
  quantity
  securityType
  source
  currency
  importedSecurity {
    ...AllImportedSecurityData
  }
  security {
    ...AllSecurityData
  }
}
    ${AllImportedSecurityDataFragmentDoc}
${AllSecurityDataFragmentDoc}`;
export const PortfolioHoldingsFragmentDoc = gql`
    fragment PortfolioHoldings on Portfolio {
  holdings {
    ...AllHoldingData
  }
}
    ${AllHoldingDataFragmentDoc}`;
export const AllTransactionDataFragmentDoc = gql`
    fragment AllTransactionData on Transaction {
  _id
  name
  date
  currency
  security {
    ...AllSecurityData
  }
  importedSecurity {
    ...AllImportedSecurityData
  }
  quantity
  amount
  fees
  price
  type
  subType
}
    ${AllSecurityDataFragmentDoc}
${AllImportedSecurityDataFragmentDoc}`;
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
export const SecuritySummaryFragmentDoc = gql`
    fragment SecuritySummary on Security {
  _id
  name
  symbol
  exchangeName
  region
  quote {
    latestPrice
  }
}
    `;
export const ChartSecurityPriceDocument = gql`
    query chartSecurityPrice($range: HistoricalRange!, $securityId: ObjectId!, $options: ChartPriceRangeOptions) {
  chartSecurityPrice(range: $range, securityId: $securityId, options: $options) {
    change
    changeOverTime
    changePercent
    close
    date
    fClose
    fHigh
    fLow
    fOpen
    fVolume
    high
    id
    key
    label
    low
    marketChangeOverTime
    open
    subkey
    symbol
    uClose
    uHigh
    uLow
    uOpen
    uVolume
    updated
    volume
  }
}
    `;
export const PlaidLinkTokenDocument = gql`
    query plaidLinkToken {
  plaidLinkToken
}
    `;
export const PortfoliosAddHoldingDocument = gql`
    mutation portfoliosAddHolding($_id: ObjectId!, $input: AddHoldingInput!) {
  portfoliosAddHolding(_id: $_id, input: $input) {
    _id
    holdings {
      averagePrice
      brokerFees
      costBasis
      quantity
    }
  }
}
    `;
export const PortfoliosBeginImportDocument = gql`
    mutation portfoliosBeginImport($publicToken: String!) {
  portfoliosBeginImport(publicToken: $publicToken) {
    importedIds
  }
}
    `;
export const PortfoliosCreatedDocument = gql`
    query portfoliosCreated {
  portfoliosCreated {
    _id
    owner {
      ...FullUser
    }
    name
    cash
    private
    description
    updatedAt
    createdAt
    totalValue
    plaidAccount {
      ...FullPlaidAccount
    }
    top5Holdings {
      costBasis
      exposure
      securityType
      marketValue
      importedSecurity {
        ...AllImportedSecurityData
      }
      security {
        ...SecuritySummary
      }
    }
  }
}
    ${FullUserFragmentDoc}
${FullPlaidAccountFragmentDoc}
${AllImportedSecurityDataFragmentDoc}
${SecuritySummaryFragmentDoc}`;
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
export const PortfoliosRemoveHoldingDocument = gql`
    mutation portfoliosRemoveHolding($portfolioId: ObjectId!, $holdingId: ObjectId!) {
  portfoliosRemoveHolding(portfolioId: $portfolioId, holdingId: $holdingId)
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
    createdAt
    description
    name
    private
    updatedAt
  }
}
    `;
export const SecuritiesFindByIdDocument = gql`
    query securitiesFindById($_id: ObjectId!) {
  securitiesFindById(_id: $_id) {
    _id
    ...AllSecurityData
    quote {
      ...AllQuoteData
    }
  }
}
    ${AllSecurityDataFragmentDoc}
${AllQuoteDataFragmentDoc}`;
export const SecuritiesSearchDocument = gql`
    query securitiesSearch($searchTerm: String!) {
  securitiesSearch(searchTerm: $searchTerm) {
    _id
    ...AllSecurityData
    quote {
      ...AllQuoteData
    }
  }
}
    ${AllSecurityDataFragmentDoc}
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
    chartSecurityPrice(variables: ChartSecurityPriceQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ChartSecurityPriceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ChartSecurityPriceQuery>(ChartSecurityPriceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'chartSecurityPrice', 'query');
    },
    plaidLinkToken(variables?: PlaidLinkTokenQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PlaidLinkTokenQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PlaidLinkTokenQuery>(PlaidLinkTokenDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'plaidLinkToken', 'query');
    },
    portfoliosAddHolding(variables: PortfoliosAddHoldingMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PortfoliosAddHoldingMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<PortfoliosAddHoldingMutation>(PortfoliosAddHoldingDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'portfoliosAddHolding', 'mutation');
    },
    portfoliosBeginImport(variables: PortfoliosBeginImportMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PortfoliosBeginImportMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<PortfoliosBeginImportMutation>(PortfoliosBeginImportDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'portfoliosBeginImport', 'mutation');
    },
    portfoliosCreated(variables?: PortfoliosCreatedQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PortfoliosCreatedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PortfoliosCreatedQuery>(PortfoliosCreatedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'portfoliosCreated', 'query');
    },
    portfoliosFindById(variables: PortfoliosFindByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PortfoliosFindByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PortfoliosFindByIdQuery>(PortfoliosFindByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'portfoliosFindById', 'query');
    },
    portfoliosInitEmpty(variables?: PortfoliosInitEmptyMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PortfoliosInitEmptyMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<PortfoliosInitEmptyMutation>(PortfoliosInitEmptyDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'portfoliosInitEmpty', 'mutation');
    },
    portfoliosRemoveHolding(variables: PortfoliosRemoveHoldingMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PortfoliosRemoveHoldingMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<PortfoliosRemoveHoldingMutation>(PortfoliosRemoveHoldingDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'portfoliosRemoveHolding', 'mutation');
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
    securitiesFindById(variables: SecuritiesFindByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SecuritiesFindByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SecuritiesFindByIdQuery>(SecuritiesFindByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'securitiesFindById', 'query');
    },
    securitiesSearch(variables: SecuritiesSearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SecuritiesSearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SecuritiesSearchQuery>(SecuritiesSearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'securitiesSearch', 'query');
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