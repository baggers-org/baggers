import { batchIsinToSymbol } from '@/iex/batchIsinToSymbol';
import {
  InvestmentsHoldingsGetResponse,
  InvestmentsTransactionsGetResponse,
} from 'plaid';
import { Holding, Portfolio } from '../entities';
import { TransactionSubtype, TransactionType } from '../entities/transaction';

type PopulatedData = {
  security?: InvestmentsHoldingsGetResponse['securities'][0];
  account?: InvestmentsHoldingsGetResponse['accounts'][0];
};
export type FlatHolding = InvestmentsHoldingsGetResponse['holdings'][0] &
  PopulatedData;

export type FlatTransaction = InvestmentsTransactionsGetResponse['investment_transactions'][0] &
  PopulatedData;

type PortfolioWithoutOwner = Omit<
  Portfolio,
  'owner' | '_id' | 'description' | 'totalValue'
>;
type BasicPortfolio = Omit<PortfolioWithoutOwner, 'holdings' | 'transactions'>;

export const flattenTransactions = (
  input: InvestmentsTransactionsGetResponse,
): FlatTransaction[] => {
  return input.investment_transactions.map((transaction) => ({
    ...transaction,
    account: input.accounts.find(
      (acc) => acc.account_id === transaction.account_id,
    ),
    security: input.securities.find(
      (sec) => sec.security_id === transaction.security_id,
    ),
  }));
};

export const flattenHoldings = (
  input: InvestmentsHoldingsGetResponse,
): FlatHolding[] => {
  return input.holdings.map((holding) => ({
    ...holding,
    account: input.accounts.find(
      (acc) => acc.account_id === holding.account_id,
    ),
    security: input.securities.find(
      (sec) => sec.security_id === holding.security_id,
    ),
  }));
};

const equityOnly = (transaction) => transaction.security?.type === `equity`;
const addHoldings = async (
  forPortfolio: BasicPortfolio,
  holdings: InvestmentsHoldingsGetResponse,
): Promise<BasicPortfolio & { holdings: Portfolio['holdings'] }> => {
  const equityHoldings = flattenHoldings(holdings).filter(equityOnly);
  const portfolioHoldings = equityHoldings
    .filter(
      (holding) => holding.account_id === forPortfolio?.plaid?.linkedAccountId,
    )
    .map((holding) => {
      console.log(holding);

      return {
        costBasis: holding.cost_basis,
        quantity: holding.quantity,
        // TODO: support other instruments
        holdingType: `shares`,
        // Replace the symbol isin with the full symbol in subsequent call
        symbol: holding?.security?.isin,
      } as Partial<Holding & { symbol?: string }>;
    });

  const isins = portfolioHoldings
    .map((h) => h.symbol)
    .filter((s) => typeof s !== `undefined`) as string[];

  // const symbols = await batchIsinToSymbol();
};

/**
 *
 * Gets a list of transactions ready for the DB
 */
const addTransactions = (
  forPortfolio: BasicPortfolio,
  transactions: InvestmentsTransactionsGetResponse,
): BasicPortfolio & { transactions: Portfolio['transactions'] } => {
  const equityTransactions = flattenTransactions(transactions).filter(
    equityOnly,
  );
  const finalTransactions = equityTransactions
    .filter((tran) => tran.account_id === forPortfolio?.plaid?.linkedAccountId)
    .map((tran) => {
      const {
        name,
        price,
        quantity,
        date,
        iso_currency_code: currency,
        type,
        subtype: subType,
      } = tran;
      return {
        name,
        price,
        quantity,
        currency: currency || `USD`,
        type: (type as unknown) as TransactionType,
        date: new Date(date),
        subType: (subType as unknown) as TransactionSubtype,
      };
    });

  return {
    ...forPortfolio,
    transactions: finalTransactions,
  };
};

/**
 * Creates a list of basic portfolios, this only includes account info, name etc.
 * No holdings or transactions
 */
const getBasicPortfolios = (
  holdings: InvestmentsHoldingsGetResponse,
): BasicPortfolio[] => {
  const accounts = holdings.accounts.filter(
    (account) => account.type === `investment`,
  );

  const portfolios: BasicPortfolio[] = accounts.map((account) => ({
    plaid: {
      linkedAccountId: account.account_id,
      isLinked: true,
    },
    cash: account?.balances.available || 0,
    name: account?.name,
    private: true,
  }));

  return portfolios;
};
export const mapPlaidDataToPortfolios = async (
  holdings: InvestmentsHoldingsGetResponse,
  transcations: InvestmentsTransactionsGetResponse,
): Promise<
  BasicPortfolio & { transactions: Portfolio['transactions'] } & {
      holdings: Portfolio['holdings'];
    }[]
> => {
  return Promise.all(
    getBasicPortfolios(holdings)
      .map((portfolio) => addTransactions(portfolio, transcations))
      .map(async (portfolio) => addHoldings(portfolio, holdings)),
  );
};
