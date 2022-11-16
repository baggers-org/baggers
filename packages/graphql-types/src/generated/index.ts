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
  assetClass: AssetClass;
  averagePrice: Scalars['Float'];
  currency: Scalars['String'];
  direction: HoldingDirection;
  quantity: Scalars['Float'];
  security: Scalars['String'];
  transactionDate?: InputMaybe<Scalars['DateTime']>;
};

export type Aggregate = {
  __typename?: 'Aggregate';
  c?: Maybe<Scalars['Float']>;
  h?: Maybe<Scalars['Float']>;
  l?: Maybe<Scalars['Float']>;
  n?: Maybe<Scalars['Float']>;
  o?: Maybe<Scalars['Float']>;
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
  /**
   * is_cash_equivalent: boolean | null;
   *   The security type of the holding. Valid security types are:
   *   `cash`: Cash, currency, and money market funds
   *   `cryptocurrency`: Digital or virtual currencies
   *   `derivative`: Options, warrants, and other derivative instruments
   *   `equity`: Domestic and foreign equities
   *   `etf`: Multi-asset exchange-traded investment funds
   *   `fixed income`: Bonds and certificates of deposit (CDs)
   *   `loan`: Loans and loan receivables
   *   `mutual fund`: Open- and closed-end vehicles pooling funds of multiple investors
   *   `other`: Unknown or other investment types
   */
  assetClass: AssetClass;
  /** Date for which `close_price` is accurate. Always `null` if `close_price` is `null`. */
  close_price_as_of?: Maybe<Scalars['String']>;
  /** The ISO-4217 currency code of the price given. Always `null` if `unofficial_currency_code` is non-`null`. */
  currency?: Maybe<Scalars['String']>;
  /** 9-character CUSIP, an identifier assigned to North American securities. */
  cusip?: Maybe<Scalars['String']>;
  /** If `institution_security_id` is present, this field indicates the Plaid `institution_id` of the institution to whom the identifier belongs. */
  institution_id?: Maybe<Scalars['String']>;
  /** An identifier given to the security by the institution */
  institution_security_id?: Maybe<Scalars['String']>;
  isImported?: Maybe<Scalars['Boolean']>;
  /** Indicates that a security is a highly liquid asset and can be treated like cash. */
  is_cash_equivalent?: Maybe<Scalars['Boolean']>;
  /** 12-character ISIN, a globally unique securities identifier. */
  isin?: Maybe<Scalars['String']>;
  /** Price of the security at the close of the previous trading session. Null for non-public securities.   If the security is a foreign currency this field will be updated daily and will be priced in USD.   If the security is a cryptocurrency, this field will be updated multiple times a day. As crypto prices can fluctuate quickly and data may become stale sooner than other asset classes, please refer to update_datetime with the time when the price was last updated. */
  latestPrice?: Maybe<Scalars['Float']>;
  /** A descriptive name for the security, suitable for display. */
  name?: Maybe<Scalars['String']>;
  /** In certain cases, Plaid will provide the ID of another security whose performance resembles this security, typically when the original security has low volume, or when a private security can be modeled with a publicly traded security. */
  proxy_security_id?: Maybe<Scalars['String']>;
  /** A unique, Plaid-specific identifier for the security, used to associate securities with holdings. Like all Plaid identifiers, the `security_id` is case sensitive. */
  security_id: Scalars['String'];
  /** 7-character SEDOL, an identifier assigned to securities in the UK. */
  sedol?: Maybe<Scalars['String']>;
  /** The security’s trading symbol for publicly traded securities, and otherwise a short identifier if available. */
  ticker_symbol?: Maybe<Scalars['String']>;
  /** The unofficial currency code associated with the security. Always `null` if `iso_currency_code` is non-`null`. Unofficial currency codes are used for currencies that do not have official ISO currency codes, such as cryptocurrencies and the currencies of certain countries.  See the [currency code schema](https://plaid.com/docs/api/accounts#currency-code-schema) for a full listing of supported `iso_currency_code`s. */
  unofficial_currency_code?: Maybe<Scalars['String']>;
  /** Date and time at which close_price is accurate, in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ). Always null if close_price is null. */
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
  /** Plaid’s unique identifier for the account. This value will not change unless Plaid can\'t reconcile the account with the data returned by the financial institution. This may occur, for example, when the name of the account changes. If this happens a new `account_id` will be assigned to the account.  The `account_id` can also change if the `access_token` is deleted and the same credentials that were used to generate that `access_token` are used to generate a new `access_token` on a later date. In that case, the new `account_id` will be different from the old `account_id`.  If an account with a specific `account_id` disappears instead of changing, the account is likely closed. Closed accounts are not returned by the Plaid API.  Like all Plaid identifiers, the `account_id` is case sensitive. */
  account_id: Scalars['String'];
  balances: PlaidAccountBalance;
  /** The name of the account, either assigned by the user or by the financial institution itself */
  name?: Maybe<Scalars['String']>;
  /** The official name of the account as given by the financial institution */
  official_name?: Maybe<Scalars['String']>;
  subtype?: Maybe<Scalars['String']>;
  type?: Maybe<PlaidAccountType>;
};

export type PlaidAccountBalance = {
  __typename?: 'PlaidAccountBalance';
  /** The amount of funds available to be withdrawn from the account, as determined by the financial institution.  For `credit`-type accounts, the `available` balance typically equals the `limit` less the `current` balance, less any pending outflows plus any pending inflows.  For `depository`-type accounts, the `available` balance typically equals the `current` balance less any pending outflows plus any pending inflows. For `depository`-type accounts, the `available` balance does not include the overdraft limit.  For `investment`-type accounts (or `brokerage`-type accounts for API versions 2018-05-22 and earlier), the `available` balance is the total cash available to withdraw as presented by the institution.  Note that not all institutions calculate the `available`  balance. In the event that `available` balance is unavailable, Plaid will return an `available` balance value of `null`.  Available balance may be cached and is not guaranteed to be up-to-date in realtime unless the value was returned by `/accounts/balance/get`.  If `current` is `null` this field is guaranteed not to be `null`. */
  available?: Maybe<Scalars['Float']>;
  /** The total amount of funds in or owed by the account.  For `credit`-type accounts, a positive balance indicates the amount owed; a negative amount indicates the lender owing the account holder.  For `loan`-type accounts, the current balance is the principal remaining on the loan, except in the case of student loan accounts at Sallie Mae (`ins_116944`). For Sallie Mae student loans, the account\'s balance includes both principal and any outstanding interest.  For `investment`-type accounts (or `brokerage`-type accounts for API versions 2018-05-22 and earlier), the current balance is the total value of assets as presented by the institution.  Note that balance information may be cached unless the value was returned by `/accounts/balance/get`; if the Item is enabled for Transactions, the balance will be at least as recent as the most recent Transaction update. If you require realtime balance information, use the `available` balance as provided by `/accounts/balance/get`.  When returned by `/accounts/balance/get`, this field may be `null`. When this happens, `available` is guaranteed not to be `null`. */
  current?: Maybe<Scalars['Float']>;
  /** The ISO-4217 currency code of the balance. Always null if `unofficial_currency_code` is non-null. */
  iso_currency_code?: Maybe<Scalars['String']>;
  /** Timestamp in [ISO 8601](https://wikipedia.org/wiki/ISO_8601) format (`YYYY-MM-DDTHH:mm:ssZ`) indicating the last time that the balance for the given account has been updated  This is currently only provided when the `min_last_updated_datetime` is passed when calling `/accounts/balance/get` for `ins_128026` (Capital One). */
  last_updated_datetime?: Maybe<Scalars['String']>;
  /** For `credit`-type accounts, this represents the credit limit.  For `depository`-type accounts, this represents the pre-arranged overdraft limit, which is common for current (checking) accounts in Europe.  In North America, this field is typically only available for `credit`-type accounts. */
  limit?: Maybe<Scalars['Float']>;
  /** The unofficial currency code associated with the balance. Always null if `iso_currency_code` is non-null. Unofficial currency codes are used for currencies that do not have official ISO currency codes, such as cryptocurrencies and the currencies of certain countries.  See the [currency code schema](https://plaid.com/docs/api/accounts#currency-code-schema) for a full listing of supported `unofficial_currency_code`s. */
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

/**
 * An item represents a login at a financial inst.
 * They will only be accessible by `admin` user's
 * and the primary use for storing will be to
 */
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
  top5Holdings: Array<Holding>;
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

export type ChartSecurityPriceQueryVariables = Exact<{
  ticker: Scalars['String'];
  options: ChartPriceRangeOptions;
}>;


export type ChartSecurityPriceQuery = { __typename?: 'Query', chartSecurityPrice: Array<{ __typename?: 'Aggregate', c?: number | null, h?: number | null, l?: number | null, n?: number | null, o?: number | null, t?: number | null, v?: number | null, vw?: number | null }> };

export type PlaidLinkTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type PlaidLinkTokenQuery = { __typename?: 'Query', plaidLinkToken: string };

export type AllHoldingDataFragment = { __typename?: 'Holding', _id: any, marketValue: number, exposure: number, profitLossUsd: number, profitLossPercent: number, dailyProfitLossUsd: number, averagePrice: number, costBasis: number, institutionValue?: number | null, direction?: HoldingDirection | null, quantity: number, assetClass: AssetClass, source: HoldingSource, currency: string, importedSecurity?: { __typename?: 'ImportedSecurity', latestPrice?: number | null, name?: string | null, ticker_symbol?: string | null, currency?: string | null, assetClass: AssetClass } | null, security?: { __typename?: 'Security', _id: string, currency?: string | null, exchange?: string | null, assetClass: AssetClass, figi?: string | null, name?: string | null, region?: string | null, latestPrice?: number | null, todaysChange?: number | null, todaysChangePercent?: number | null, tickerDetails?: { __typename?: 'TickerDetails', active?: boolean | null, cik?: string | null, currencyName?: string | null, description?: string | null, homepageUrl?: string | null, iconUrl?: string | null, listDate?: string | null, logoUrl?: string | null, market?: string | null, marketCap?: number | null, name?: string | null, phoneNumber?: string | null, shareClassOutstanding?: number | null, sicCode?: number | null, sicDescription?: string | null, totalEmployees?: number | null, type?: TickerType | null, weightedSharesOutstanding?: number | null } | null } | null };

export type FullPlaidAccountFragment = { __typename?: 'PlaidAccount', type?: PlaidAccountType | null, name?: string | null, subtype?: string | null, official_name?: string | null, account_id: string, balances: { __typename?: 'PlaidAccountBalance', current?: number | null, available?: number | null } };

export type PortfolioSummaryFragment = { __typename?: 'Portfolio', _id: any, cash: number, name: string, description?: string | null, private: boolean, createdAt?: any | null, updatedAt?: any | null, totalValue: number, owner: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string>, createdAt?: any | null, updatedAt?: any | null }, plaidAccount?: { __typename?: 'PlaidAccount', type?: PlaidAccountType | null, name?: string | null, subtype?: string | null, official_name?: string | null, account_id: string, balances: { __typename?: 'PlaidAccountBalance', current?: number | null, available?: number | null } } | null };

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


export type PortfoliosCreatedQuery = { __typename?: 'Query', portfoliosCreated: Array<{ __typename?: 'PortfolioSummary', _id: any, name: string, cash: number, private: boolean, description?: string | null, updatedAt?: any | null, createdAt?: any | null, totalValue: number, owner: { __typename?: 'User', _id: string, displayName: string, emails?: Array<string> | null, photos: Array<string>, createdAt?: any | null, updatedAt?: any | null }, plaidAccount?: { __typename?: 'PlaidAccount', type?: PlaidAccountType | null, name?: string | null, subtype?: string | null, official_name?: string | null, account_id: string, balances: { __typename?: 'PlaidAccountBalance', current?: number | null, available?: number | null } } | null, top5Holdings: Array<{ __typename?: 'Holding', costBasis: number, exposure: number, assetClass: AssetClass, marketValue: number, importedSecurity?: { __typename?: 'ImportedSecurity', latestPrice?: number | null, name?: string | null, ticker_symbol?: string | null, currency?: string | null, assetClass: AssetClass } | null, security?: { __typename?: 'Security', _id: string, name?: string | null, region?: string | null, latestPrice?: number | null } | null }> }> };

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
