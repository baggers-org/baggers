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
  costBasis: Scalars['Float'];
  currency: Scalars['String'];
  direction: HoldingDirection;
  quantity: Scalars['Float'];
  security: Scalars['String'];
  transactionDate?: InputMaybe<Scalars['DateTime']>;
};

export type Aggregate = {
  __typename?: 'Aggregate';
  av?: Maybe<Scalars['Float']>;
  c?: Maybe<Scalars['Float']>;
  h?: Maybe<Scalars['Float']>;
  l?: Maybe<Scalars['Float']>;
  n?: Maybe<Scalars['Float']>;
  o?: Maybe<Scalars['Float']>;
  sym?: Maybe<Scalars['String']>;
  t?: Maybe<Scalars['Float']>;
  v?: Maybe<Scalars['Float']>;
  vw?: Maybe<Scalars['Float']>;
};

export enum AscDesc {
  Asc = 'asc',
  Desc = 'desc'
}

export enum AssetClass {
  Cash = 'cash',
  Cryptocurrency = 'cryptocurrency',
  Derivative = 'derivative',
  Fx = 'fx',
  Stock = 'stock'
}

export type ChartPriceRangeOptions = {
  from: Scalars['String'];
  sort?: InputMaybe<AscDesc>;
  timespan: Timespan;
  to: Scalars['String'];
};

export type CreateUserInput = {
  _id: Scalars['String'];
  displayName: Scalars['String'];
  emails?: InputMaybe<Array<Scalars['String']>>;
  photos?: InputMaybe<Array<Scalars['String']>>;
};

export type Holding = {
  __typename?: 'Holding';
  _id: Scalars['ObjectId'];
  assetClass: AssetClass;
  averagePrice: Scalars['Float'];
  costBasis: Scalars['Float'];
  createdAt?: Maybe<Scalars['DateTime']>;
  currency: Scalars['String'];
  dailyProfitLossUsd: Scalars['Float'];
  direction?: Maybe<HoldingDirection>;
  exposure: Scalars['Float'];
  importedSecurity?: Maybe<ImportedSecurity>;
  institutionValue?: Maybe<Scalars['Float']>;
  marketValue: Scalars['Float'];
  plaidAccountId?: Maybe<Scalars['String']>;
  profitLossPercent: Scalars['Float'];
  profitLossUsd: Scalars['Float'];
  quantity: Scalars['Float'];
  security?: Maybe<Security>;
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
  assetClass: AssetClass;
  averagePrice: Scalars['Float'];
  costBasis: Scalars['Float'];
  createdAt?: Maybe<Scalars['DateTime']>;
  currency: Scalars['String'];
  direction?: Maybe<HoldingDirection>;
  importedSecurity?: Maybe<ImportedSecurity>;
  institutionValue?: Maybe<Scalars['Float']>;
  plaidAccountId?: Maybe<Scalars['String']>;
  quantity: Scalars['Float'];
  security?: Maybe<Security>;
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
  assetClass: AssetClass;
  close_price_as_of?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  cusip?: Maybe<Scalars['String']>;
  institution_id?: Maybe<Scalars['String']>;
  institution_security_id?: Maybe<Scalars['String']>;
  isImported?: Maybe<Scalars['Boolean']>;
  is_cash_equivalent?: Maybe<Scalars['Boolean']>;
  isin?: Maybe<Scalars['String']>;
  latestPrice?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  proxy_security_id?: Maybe<Scalars['String']>;
  security_id: Scalars['String'];
  sedol?: Maybe<Scalars['String']>;
  ticker_symbol?: Maybe<Scalars['String']>;
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
  addAlphaTesterEmail: RecordId;
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


export type MutationAddAlphaTesterEmailArgs = {
  email: Scalars['String'];
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
  accessToken: Scalars['String'];
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
  assetClass: AssetClass;
  averagePrice: Scalars['Float'];
  costBasis: Scalars['Float'];
  createdAt?: Maybe<Scalars['DateTime']>;
  currency: Scalars['String'];
  direction?: Maybe<HoldingDirection>;
  importedSecurity?: Maybe<ImportedSecurity>;
  institutionValue?: Maybe<Scalars['Float']>;
  plaidAccountId?: Maybe<Scalars['String']>;
  quantity: Scalars['Float'];
  security?: Maybe<Security>;
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
  totalValue: Scalars['Float'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Query = {
  __typename?: 'Query';
  chartSecurityPrice: Array<Aggregate>;
  plaidLinkToken: Scalars['String'];
  portfoliosCreated: Array<PortfolioSummary>;
  portfoliosFindById: Portfolio;
  securitiesFindById: Security;
  securitiesSearch: Array<Security>;
  usersFindById: User;
};


export type QueryChartSecurityPriceArgs = {
  options: ChartPriceRangeOptions;
  ticker: Scalars['String'];
};


export type QueryPortfoliosFindByIdArgs = {
  _id: Scalars['ObjectId'];
};


export type QuerySecuritiesFindByIdArgs = {
  _id: Scalars['String'];
};


export type QuerySecuritiesSearchArgs = {
  searchTerm: Scalars['String'];
};


export type QueryUsersFindByIdArgs = {
  _id: Scalars['ID'];
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
  _id: Scalars['String'];
  assetClass: AssetClass;
  currency?: Maybe<Scalars['String']>;
  exchange?: Maybe<Scalars['String']>;
  figi?: Maybe<Scalars['String']>;
  isImported?: Maybe<Scalars['Boolean']>;
  latestPrice?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  tickerDetails?: Maybe<TickerDetails>;
  todaysChange?: Maybe<Scalars['Float']>;
  todaysChangePercent?: Maybe<Scalars['Float']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  chartRealtime: Aggregate;
  portfoliosSubscribeToMarketData?: Maybe<Portfolio>;
};


export type SubscriptionChartRealtimeArgs = {
  ticker: Scalars['String'];
};


export type SubscriptionPortfoliosSubscribeToMarketDataArgs = {
  _id: Scalars['ObjectId'];
};

export type TickerDetails = {
  __typename?: 'TickerDetails';
  active?: Maybe<Scalars['Boolean']>;
  cik?: Maybe<Scalars['String']>;
  currencyName?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  homepageUrl?: Maybe<Scalars['String']>;
  iconUrl?: Maybe<Scalars['String']>;
  listDate?: Maybe<Scalars['String']>;
  logoUrl?: Maybe<Scalars['String']>;
  market?: Maybe<Scalars['String']>;
  marketCap?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  shareClassOutstanding?: Maybe<Scalars['Float']>;
  sicCode?: Maybe<Scalars['Float']>;
  sicDescription?: Maybe<Scalars['String']>;
  totalEmployees?: Maybe<Scalars['Float']>;
  type?: Maybe<TickerType>;
  weightedSharesOutstanding?: Maybe<Scalars['Float']>;
};

export enum TickerType {
  Adrc = 'Adrc',
  Adrr = 'Adrr',
  Adrw = 'Adrw',
  Agen = 'Agen',
  Basket = 'Basket',
  Bond = 'Bond',
  Cs = 'Cs',
  Eqlk = 'Eqlk',
  Etf = 'Etf',
  Etn = 'Etn',
  Etv = 'Etv',
  Fund = 'Fund',
  Gdr = 'Gdr',
  Lt = 'Lt',
  Nyrs = 'Nyrs',
  Os = 'Os',
  Other = 'Other',
  Pfd = 'Pfd',
  Right = 'Right',
  Sp = 'Sp',
  Unit = 'Unit',
  Warrant = 'Warrant'
}

export enum Timespan {
  Day = 'day',
  Hour = 'hour',
  Minute = 'minute',
  Month = 'month',
  Quarter = 'quarter',
  Week = 'week',
  Year = 'year'
}

export type Transaction = {
  __typename?: 'Transaction';
  _id: Scalars['ObjectId'];
  amount: Scalars['Float'];
  assetClass: AssetClass;
  createdBy?: Maybe<User>;
  currency: Scalars['String'];
  date: Scalars['DateTime'];
  fees: Scalars['Float'];
  importedSecurity?: Maybe<ImportedSecurity>;
  name: Scalars['String'];
  /** This is the account_id from plaid */
  plaidAccountId?: Maybe<Scalars['String']>;
  /** This is the transaction_id from plaid */
  plaidTransactionId?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  quantity: Scalars['Float'];
  security?: Maybe<Security>;
  subType: TransactionSubtype;
  type: TransactionType;
};

export type TransactionFromDb = {
  __typename?: 'TransactionFromDb';
  _id: Scalars['ObjectId'];
  amount: Scalars['Float'];
  assetClass: AssetClass;
  createdBy?: Maybe<User>;
  currency: Scalars['String'];
  date: Scalars['DateTime'];
  fees: Scalars['Float'];
  importedSecurity?: Maybe<ImportedSecurity>;
  name: Scalars['String'];
  /** This is the account_id from plaid */
  plaidAccountId?: Maybe<Scalars['String']>;
  /** This is the transaction_id from plaid */
  plaidTransactionId?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  quantity: Scalars['Float'];
  security?: Maybe<Security>;
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

export type AddAlphaTesterEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type AddAlphaTesterEmailMutation = { __typename?: 'Mutation', addAlphaTesterEmail: { __typename?: 'RecordId', _id: string } };

export type ChartSecurityPriceQueryVariables = Exact<{
  ticker: Scalars['String'];
  options: ChartPriceRangeOptions;
}>;


export type ChartSecurityPriceQuery = { __typename?: 'Query', chartSecurityPrice: Array<{ __typename?: 'Aggregate', c?: number | null, h?: number | null, l?: number | null, n?: number | null, o?: number | null, t?: number | null, v?: number | null, vw?: number | null }> };

export type PlaidLinkTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type PlaidLinkTokenQuery = { __typename?: 'Query', plaidLinkToken: string };

export type AllHoldingDataFragment = { __typename?: 'Holding', _id: any, marketValue: number, exposure: number, profitLossUsd: number, profitLossPercent: number, dailyProfitLossUsd: number, averagePrice: number, costBasis: number, institutionValue?: number | null, direction?: HoldingDirection | null, quantity: number, assetClass: AssetClass, source: HoldingSource, currency: string, importedSecurity?: { __typename?: 'ImportedSecurity', latestPrice?: number | null, name?: string | null, ticker_symbol?: string | null, currency?: string | null, assetClass: AssetClass } | null, security?: { __typename?: 'Security', _id: string, currency?: string | null, exchange?: string | null, assetClass: AssetClass, figi?: string | null, name?: string | null, region?: string | null, latestPrice?: number | null, todaysChange?: number | null, todaysChangePercent?: number | null, tickerDetails?: { __typename?: 'TickerDetails', active?: boolean | null, cik?: string | null, currencyName?: string | null, description?: string | null, homepageUrl?: string | null, iconUrl?: string | null, listDate?: string | null, logoUrl?: string | null, market?: string | null, marketCap?: number | null, name?: string | null, phoneNumber?: string | null, shareClassOutstanding?: number | null, sicCode?: number | null, sicDescription?: string | null, totalEmployees?: number | null, type?: TickerType | null, weightedSharesOutstanding?: number | null } | null } | null };

export type FullPlaidAccountFragment = { __typename?: 'PlaidAccount', type?: PlaidAccountType | null, name?: string | null, subtype?: string | null, official_name?: string | null, account_id: string, balances: { __typename?: 'PlaidAccountBalance', current?: number | null, available?: number | null } };

export type FullPortfolioSummaryFragment = { __typename?: 'PortfolioSummary', _id: any, cash: number, name: string, description?: string | null, private: boolean, createdAt?: any | null, updatedAt?: any | null, totalValue: number, owner: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string>, createdAt?: any | null, updatedAt?: any | null }, plaidAccount?: { __typename?: 'PlaidAccount', type?: PlaidAccountType | null, name?: string | null, subtype?: string | null, official_name?: string | null, account_id: string, balances: { __typename?: 'PlaidAccountBalance', current?: number | null, available?: number | null } } | null };

export type PortfolioTransactionsFragment = { __typename?: 'Portfolio', transactions: Array<{ __typename?: 'Transaction', _id: any, name: string, date: any, currency: string, quantity: number, amount: number, fees: number, price?: number | null, type: TransactionType, subType: TransactionSubtype, security?: { __typename?: 'Security', _id: string, currency?: string | null, exchange?: string | null, assetClass: AssetClass, figi?: string | null, name?: string | null, region?: string | null, latestPrice?: number | null, todaysChange?: number | null, todaysChangePercent?: number | null, tickerDetails?: { __typename?: 'TickerDetails', active?: boolean | null, cik?: string | null, currencyName?: string | null, description?: string | null, homepageUrl?: string | null, iconUrl?: string | null, listDate?: string | null, logoUrl?: string | null, market?: string | null, marketCap?: number | null, name?: string | null, phoneNumber?: string | null, shareClassOutstanding?: number | null, sicCode?: number | null, sicDescription?: string | null, totalEmployees?: number | null, type?: TickerType | null, weightedSharesOutstanding?: number | null } | null } | null, importedSecurity?: { __typename?: 'ImportedSecurity', latestPrice?: number | null, name?: string | null, ticker_symbol?: string | null, currency?: string | null, assetClass: AssetClass } | null }> };

export type PortfolioHoldingsFragment = { __typename?: 'Portfolio', holdings: Array<{ __typename?: 'Holding', _id: any, marketValue: number, exposure: number, profitLossUsd: number, profitLossPercent: number, dailyProfitLossUsd: number, averagePrice: number, costBasis: number, institutionValue?: number | null, direction?: HoldingDirection | null, quantity: number, assetClass: AssetClass, source: HoldingSource, currency: string, importedSecurity?: { __typename?: 'ImportedSecurity', latestPrice?: number | null, name?: string | null, ticker_symbol?: string | null, currency?: string | null, assetClass: AssetClass } | null, security?: { __typename?: 'Security', _id: string, currency?: string | null, exchange?: string | null, assetClass: AssetClass, figi?: string | null, name?: string | null, region?: string | null, latestPrice?: number | null, todaysChange?: number | null, todaysChangePercent?: number | null, tickerDetails?: { __typename?: 'TickerDetails', active?: boolean | null, cik?: string | null, currencyName?: string | null, description?: string | null, homepageUrl?: string | null, iconUrl?: string | null, listDate?: string | null, logoUrl?: string | null, market?: string | null, marketCap?: number | null, name?: string | null, phoneNumber?: string | null, shareClassOutstanding?: number | null, sicCode?: number | null, sicDescription?: string | null, totalEmployees?: number | null, type?: TickerType | null, weightedSharesOutstanding?: number | null } | null } | null }> };

export type AllPortfolioDataFragment = { __typename?: 'Portfolio', _id: any, cash: number, name: string, description?: string | null, private: boolean, createdAt?: any | null, updatedAt?: any | null, totalValue: number, owner: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string>, createdAt?: any | null, updatedAt?: any | null }, plaidAccount?: { __typename?: 'PlaidAccount', type?: PlaidAccountType | null, name?: string | null, subtype?: string | null, official_name?: string | null, account_id: string, balances: { __typename?: 'PlaidAccountBalance', current?: number | null, available?: number | null } } | null, holdings: Array<{ __typename?: 'Holding', _id: any, marketValue: number, exposure: number, profitLossUsd: number, profitLossPercent: number, dailyProfitLossUsd: number, averagePrice: number, costBasis: number, institutionValue?: number | null, direction?: HoldingDirection | null, quantity: number, assetClass: AssetClass, source: HoldingSource, currency: string, importedSecurity?: { __typename?: 'ImportedSecurity', latestPrice?: number | null, name?: string | null, ticker_symbol?: string | null, currency?: string | null, assetClass: AssetClass } | null, security?: { __typename?: 'Security', _id: string, currency?: string | null, exchange?: string | null, assetClass: AssetClass, figi?: string | null, name?: string | null, region?: string | null, latestPrice?: number | null, todaysChange?: number | null, todaysChangePercent?: number | null, tickerDetails?: { __typename?: 'TickerDetails', active?: boolean | null, cik?: string | null, currencyName?: string | null, description?: string | null, homepageUrl?: string | null, iconUrl?: string | null, listDate?: string | null, logoUrl?: string | null, market?: string | null, marketCap?: number | null, name?: string | null, phoneNumber?: string | null, shareClassOutstanding?: number | null, sicCode?: number | null, sicDescription?: string | null, totalEmployees?: number | null, type?: TickerType | null, weightedSharesOutstanding?: number | null } | null } | null }>, transactions: Array<{ __typename?: 'Transaction', _id: any, name: string, date: any, currency: string, quantity: number, amount: number, fees: number, price?: number | null, type: TransactionType, subType: TransactionSubtype, security?: { __typename?: 'Security', _id: string, currency?: string | null, exchange?: string | null, assetClass: AssetClass, figi?: string | null, name?: string | null, region?: string | null, latestPrice?: number | null, todaysChange?: number | null, todaysChangePercent?: number | null, tickerDetails?: { __typename?: 'TickerDetails', active?: boolean | null, cik?: string | null, currencyName?: string | null, description?: string | null, homepageUrl?: string | null, iconUrl?: string | null, listDate?: string | null, logoUrl?: string | null, market?: string | null, marketCap?: number | null, name?: string | null, phoneNumber?: string | null, shareClassOutstanding?: number | null, sicCode?: number | null, sicDescription?: string | null, totalEmployees?: number | null, type?: TickerType | null, weightedSharesOutstanding?: number | null } | null } | null, importedSecurity?: { __typename?: 'ImportedSecurity', latestPrice?: number | null, name?: string | null, ticker_symbol?: string | null, currency?: string | null, assetClass: AssetClass } | null }> };

export type AllTransactionDataFragment = { __typename?: 'Transaction', _id: any, name: string, date: any, currency: string, quantity: number, amount: number, fees: number, price?: number | null, type: TransactionType, subType: TransactionSubtype, security?: { __typename?: 'Security', _id: string, currency?: string | null, exchange?: string | null, assetClass: AssetClass, figi?: string | null, name?: string | null, region?: string | null, latestPrice?: number | null, todaysChange?: number | null, todaysChangePercent?: number | null, tickerDetails?: { __typename?: 'TickerDetails', active?: boolean | null, cik?: string | null, currencyName?: string | null, description?: string | null, homepageUrl?: string | null, iconUrl?: string | null, listDate?: string | null, logoUrl?: string | null, market?: string | null, marketCap?: number | null, name?: string | null, phoneNumber?: string | null, shareClassOutstanding?: number | null, sicCode?: number | null, sicDescription?: string | null, totalEmployees?: number | null, type?: TickerType | null, weightedSharesOutstanding?: number | null } | null } | null, importedSecurity?: { __typename?: 'ImportedSecurity', latestPrice?: number | null, name?: string | null, ticker_symbol?: string | null, currency?: string | null, assetClass: AssetClass } | null };

export type PortfoliosAddHoldingMutationVariables = Exact<{
  _id: Scalars['ObjectId'];
  input: AddHoldingInput;
}>;


export type PortfoliosAddHoldingMutation = { __typename?: 'Mutation', portfoliosAddHolding: { __typename?: 'PortfolioFromDb', _id: any, holdings: Array<{ __typename?: 'HoldingFromDb', averagePrice: number, costBasis: number, quantity: number }> } };

export type PortfoliosBeginImportMutationVariables = Exact<{
  publicToken: Scalars['String'];
}>;


export type PortfoliosBeginImportMutation = { __typename?: 'Mutation', portfoliosBeginImport: { __typename?: 'ImportResponse', importedIds: Array<any> } };

export type PortfoliosCreatedQueryVariables = Exact<{ [key: string]: never; }>;


export type PortfoliosCreatedQuery = { __typename?: 'Query', portfoliosCreated: Array<{ __typename?: 'PortfolioSummary', _id: any, cash: number, name: string, description?: string | null, private: boolean, createdAt?: any | null, updatedAt?: any | null, totalValue: number, owner: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string>, createdAt?: any | null, updatedAt?: any | null }, plaidAccount?: { __typename?: 'PlaidAccount', type?: PlaidAccountType | null, name?: string | null, subtype?: string | null, official_name?: string | null, account_id: string, balances: { __typename?: 'PlaidAccountBalance', current?: number | null, available?: number | null } } | null }> };

export type PortfoliosFindByIdQueryVariables = Exact<{
  _id: Scalars['ObjectId'];
}>;


export type PortfoliosFindByIdQuery = { __typename?: 'Query', portfoliosFindById: { __typename?: 'Portfolio', _id: any, cash: number, name: string, description?: string | null, private: boolean, createdAt?: any | null, updatedAt?: any | null, totalValue: number, owner: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string>, createdAt?: any | null, updatedAt?: any | null }, plaidAccount?: { __typename?: 'PlaidAccount', type?: PlaidAccountType | null, name?: string | null, subtype?: string | null, official_name?: string | null, account_id: string, balances: { __typename?: 'PlaidAccountBalance', current?: number | null, available?: number | null } } | null, holdings: Array<{ __typename?: 'Holding', _id: any, marketValue: number, exposure: number, profitLossUsd: number, profitLossPercent: number, dailyProfitLossUsd: number, averagePrice: number, costBasis: number, institutionValue?: number | null, direction?: HoldingDirection | null, quantity: number, assetClass: AssetClass, source: HoldingSource, currency: string, importedSecurity?: { __typename?: 'ImportedSecurity', latestPrice?: number | null, name?: string | null, ticker_symbol?: string | null, currency?: string | null, assetClass: AssetClass } | null, security?: { __typename?: 'Security', _id: string, currency?: string | null, exchange?: string | null, assetClass: AssetClass, figi?: string | null, name?: string | null, region?: string | null, latestPrice?: number | null, todaysChange?: number | null, todaysChangePercent?: number | null, tickerDetails?: { __typename?: 'TickerDetails', active?: boolean | null, cik?: string | null, currencyName?: string | null, description?: string | null, homepageUrl?: string | null, iconUrl?: string | null, listDate?: string | null, logoUrl?: string | null, market?: string | null, marketCap?: number | null, name?: string | null, phoneNumber?: string | null, shareClassOutstanding?: number | null, sicCode?: number | null, sicDescription?: string | null, totalEmployees?: number | null, type?: TickerType | null, weightedSharesOutstanding?: number | null } | null } | null }>, transactions: Array<{ __typename?: 'Transaction', _id: any, name: string, date: any, currency: string, quantity: number, amount: number, fees: number, price?: number | null, type: TransactionType, subType: TransactionSubtype, security?: { __typename?: 'Security', _id: string, currency?: string | null, exchange?: string | null, assetClass: AssetClass, figi?: string | null, name?: string | null, region?: string | null, latestPrice?: number | null, todaysChange?: number | null, todaysChangePercent?: number | null, tickerDetails?: { __typename?: 'TickerDetails', active?: boolean | null, cik?: string | null, currencyName?: string | null, description?: string | null, homepageUrl?: string | null, iconUrl?: string | null, listDate?: string | null, logoUrl?: string | null, market?: string | null, marketCap?: number | null, name?: string | null, phoneNumber?: string | null, shareClassOutstanding?: number | null, sicCode?: number | null, sicDescription?: string | null, totalEmployees?: number | null, type?: TickerType | null, weightedSharesOutstanding?: number | null } | null } | null, importedSecurity?: { __typename?: 'ImportedSecurity', latestPrice?: number | null, name?: string | null, ticker_symbol?: string | null, currency?: string | null, assetClass: AssetClass } | null }> } };

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

export type PortfoliosSubscribeToMarketDataSubscriptionVariables = Exact<{
  id: Scalars['ObjectId'];
}>;


export type PortfoliosSubscribeToMarketDataSubscription = { __typename?: 'Subscription', portfoliosSubscribeToMarketData?: { __typename?: 'Portfolio', _id: any, cash: number, name: string, description?: string | null, private: boolean, createdAt?: any | null, updatedAt?: any | null, totalValue: number, owner: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string>, createdAt?: any | null, updatedAt?: any | null }, plaidAccount?: { __typename?: 'PlaidAccount', type?: PlaidAccountType | null, name?: string | null, subtype?: string | null, official_name?: string | null, account_id: string, balances: { __typename?: 'PlaidAccountBalance', current?: number | null, available?: number | null } } | null, holdings: Array<{ __typename?: 'Holding', _id: any, marketValue: number, exposure: number, profitLossUsd: number, profitLossPercent: number, dailyProfitLossUsd: number, averagePrice: number, costBasis: number, institutionValue?: number | null, direction?: HoldingDirection | null, quantity: number, assetClass: AssetClass, source: HoldingSource, currency: string, importedSecurity?: { __typename?: 'ImportedSecurity', latestPrice?: number | null, name?: string | null, ticker_symbol?: string | null, currency?: string | null, assetClass: AssetClass } | null, security?: { __typename?: 'Security', _id: string, currency?: string | null, exchange?: string | null, assetClass: AssetClass, figi?: string | null, name?: string | null, region?: string | null, latestPrice?: number | null, todaysChange?: number | null, todaysChangePercent?: number | null, tickerDetails?: { __typename?: 'TickerDetails', active?: boolean | null, cik?: string | null, currencyName?: string | null, description?: string | null, homepageUrl?: string | null, iconUrl?: string | null, listDate?: string | null, logoUrl?: string | null, market?: string | null, marketCap?: number | null, name?: string | null, phoneNumber?: string | null, shareClassOutstanding?: number | null, sicCode?: number | null, sicDescription?: string | null, totalEmployees?: number | null, type?: TickerType | null, weightedSharesOutstanding?: number | null } | null } | null }>, transactions: Array<{ __typename?: 'Transaction', _id: any, name: string, date: any, currency: string, quantity: number, amount: number, fees: number, price?: number | null, type: TransactionType, subType: TransactionSubtype, security?: { __typename?: 'Security', _id: string, currency?: string | null, exchange?: string | null, assetClass: AssetClass, figi?: string | null, name?: string | null, region?: string | null, latestPrice?: number | null, todaysChange?: number | null, todaysChangePercent?: number | null, tickerDetails?: { __typename?: 'TickerDetails', active?: boolean | null, cik?: string | null, currencyName?: string | null, description?: string | null, homepageUrl?: string | null, iconUrl?: string | null, listDate?: string | null, logoUrl?: string | null, market?: string | null, marketCap?: number | null, name?: string | null, phoneNumber?: string | null, shareClassOutstanding?: number | null, sicCode?: number | null, sicDescription?: string | null, totalEmployees?: number | null, type?: TickerType | null, weightedSharesOutstanding?: number | null } | null } | null, importedSecurity?: { __typename?: 'ImportedSecurity', latestPrice?: number | null, name?: string | null, ticker_symbol?: string | null, currency?: string | null, assetClass: AssetClass } | null }> } | null };

export type PortfoliosUpdateOneMutationVariables = Exact<{
  _id: Scalars['ObjectId'];
  input: UpdatePortfolioInput;
}>;


export type PortfoliosUpdateOneMutation = { __typename?: 'Mutation', portfoliosUpdateOne: { __typename?: 'PortfolioFromDb', _id: any, createdAt?: any | null, description?: string | null, name: string, private: boolean, updatedAt?: any | null } };

export type AllSecurityDataFragment = { __typename?: 'Security', _id: string, currency?: string | null, exchange?: string | null, assetClass: AssetClass, figi?: string | null, name?: string | null, region?: string | null, latestPrice?: number | null, todaysChange?: number | null, todaysChangePercent?: number | null, tickerDetails?: { __typename?: 'TickerDetails', active?: boolean | null, cik?: string | null, currencyName?: string | null, description?: string | null, homepageUrl?: string | null, iconUrl?: string | null, listDate?: string | null, logoUrl?: string | null, market?: string | null, marketCap?: number | null, name?: string | null, phoneNumber?: string | null, shareClassOutstanding?: number | null, sicCode?: number | null, sicDescription?: string | null, totalEmployees?: number | null, type?: TickerType | null, weightedSharesOutstanding?: number | null } | null };

export type AllImportedSecurityDataFragment = { __typename?: 'ImportedSecurity', latestPrice?: number | null, name?: string | null, ticker_symbol?: string | null, currency?: string | null, assetClass: AssetClass };

export type SecuritySummaryFragment = { __typename?: 'Security', _id: string, name?: string | null, region?: string | null, latestPrice?: number | null };

export type AllTickerDetailsFragment = { __typename?: 'TickerDetails', active?: boolean | null, cik?: string | null, currencyName?: string | null, description?: string | null, homepageUrl?: string | null, iconUrl?: string | null, listDate?: string | null, logoUrl?: string | null, market?: string | null, marketCap?: number | null, name?: string | null, phoneNumber?: string | null, shareClassOutstanding?: number | null, sicCode?: number | null, sicDescription?: string | null, totalEmployees?: number | null, type?: TickerType | null, weightedSharesOutstanding?: number | null };

export type SecuritiesFindByIdQueryVariables = Exact<{
  _id: Scalars['String'];
}>;


export type SecuritiesFindByIdQuery = { __typename?: 'Query', securitiesFindById: { __typename?: 'Security', _id: string, currency?: string | null, exchange?: string | null, assetClass: AssetClass, figi?: string | null, name?: string | null, region?: string | null, latestPrice?: number | null, todaysChange?: number | null, todaysChangePercent?: number | null, tickerDetails?: { __typename?: 'TickerDetails', active?: boolean | null, cik?: string | null, currencyName?: string | null, description?: string | null, homepageUrl?: string | null, iconUrl?: string | null, listDate?: string | null, logoUrl?: string | null, market?: string | null, marketCap?: number | null, name?: string | null, phoneNumber?: string | null, shareClassOutstanding?: number | null, sicCode?: number | null, sicDescription?: string | null, totalEmployees?: number | null, type?: TickerType | null, weightedSharesOutstanding?: number | null } | null } };

export type SecuritiesSearchQueryVariables = Exact<{
  searchTerm: Scalars['String'];
}>;


export type SecuritiesSearchQuery = { __typename?: 'Query', securitiesSearch: Array<{ __typename?: 'Security', _id: string, currency?: string | null, exchange?: string | null, assetClass: AssetClass, figi?: string | null, name?: string | null, region?: string | null, latestPrice?: number | null, todaysChange?: number | null, todaysChangePercent?: number | null, tickerDetails?: { __typename?: 'TickerDetails', active?: boolean | null, cik?: string | null, currencyName?: string | null, description?: string | null, homepageUrl?: string | null, iconUrl?: string | null, listDate?: string | null, logoUrl?: string | null, market?: string | null, marketCap?: number | null, name?: string | null, phoneNumber?: string | null, shareClassOutstanding?: number | null, sicCode?: number | null, sicDescription?: string | null, totalEmployees?: number | null, type?: TickerType | null, weightedSharesOutstanding?: number | null } | null }> };

export type FullUserFragment = { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string>, createdAt?: any | null, updatedAt?: any | null };

export type UsersFindByIdQueryVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type UsersFindByIdQuery = { __typename?: 'Query', usersFindById: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string>, createdAt?: any | null, updatedAt?: any | null } };

export type UsersFindOrCreateMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type UsersFindOrCreateMutation = { __typename?: 'Mutation', usersFindOrCreate: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string>, createdAt?: any | null, updatedAt?: any | null } };
