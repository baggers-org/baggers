import { Injectable } from '@nestjs/common';
import {
  AccountBase,
  AccountType,
  InvestmentsTransactionsGetResponse,
  InvestmentTransactionSubtype,
  InvestmentTransactionType,
} from 'plaid';
import { SecuritiesUtilService } from '~/securities/securities-util.service';
import {
  HoldingFromDb,
  PortfolioFromDb,
  Transaction,
  UnmatchedTransaction,
} from '../entities';
import { HoldingsUtilService } from './holdings-util.service';

@Injectable()
export class TransactionsUtilService {
  constructor(
    private holdingsUtil: HoldingsUtilService,
    private securitiesUtil: SecuritiesUtilService
  ) {}

  /**
   * Returns a map of accountId to Transactions given a plaid response
   */
  async fromPlaidResponse(
    response: InvestmentsTransactionsGetResponse
  ): Promise<Map<AccountBase, Transaction[]>> {
    const { investment_transactions, securities, accounts } = response;

    const unmatchedTransactions = investment_transactions.map((t) => {
      const importedSecurity = securities.find(
        (s) => s.security_id === t.security_id
      );
      return {
        name: t.name,
        currency: t.iso_currency_code,
        date: new Date(t.date),
        price: t.price,
        amount: t.amount,
        type: t.type,
        subType: t.subtype,
        quantity: t.quantity,
        plaidTransactionId: t.investment_transaction_id,
        plaidAccountId: t.account_id,
        importedSecurity,
      } as UnmatchedTransaction;
    });

    const transactions = await this.matchTransactions(unmatchedTransactions);

    const investmentAccounts = accounts.filter(
      (a) => a.type === AccountType.Investment
    );

    return new Map(
      investmentAccounts.map((a) => [
        a,
        transactions.filter((t) => t.plaidAccountId === a.account_id),
      ])
    );
  }

  /**
   * Givena list on "unmatched" transactions, ie. a transaction that has not yet been
   * matched to a baggers security.
   * This function will return a list of "matched" transactions.
   *
   * It is not a guarantee that every transaction will be matched, `baggersSecurity`
   * can be undefined.
   */
  async matchTransactions(
    unmatched: UnmatchedTransaction[]
  ): Promise<Transaction[]> {
    // Matched securities will not be the same length as the input array
    const matchedSecurities =
      await this.securitiesUtil.importedToBaggersSecurities(
        unmatched.map((m) => m.importedSecurity)
      );
    return unmatched.map((unmatched) => ({
      ...unmatched,
      baggersSecurity: matchedSecurities.get(unmatched.importedSecurity),
    }));
  }

  /**
   * The inner brains of `applyTransaction` - the difference being that this method
   * does not merge the resulting holdings.
   * Intended for internal use only, by `applyTransactions` - this ensures we do
   * not waste too many CPU cycles merging on every transaction, and instead
   * we can merge just once at the very end.
   */
  applyTransaction(
    portfolio: PortfolioFromDb,
    transaction: Transaction
  ): PortfolioFromDb {
    switch (transaction.type) {
      case InvestmentTransactionType.Buy: {
        return this.applyBuy(portfolio, transaction);
      }
      case InvestmentTransactionType.Sell: {
        return this.applySell(portfolio, transaction);
      }
      case InvestmentTransactionType.Cash: {
        return this.applyCash(portfolio, transaction);
      }
    }
  }
  /**
   * This method will apply all the transactions stored in the portfolio
   * to itself, resulting in a new portfolio with the "correct" cash and holdings.
   */
  applyTransactions(portfolio: PortfolioFromDb): PortfolioFromDb {
    const { transactions } = portfolio;
    return transactions
      .sort((t1, t2) => (t1.date > t2.date ? 1 : -1))
      .reduce(
        (portfolio, transaction) =>
          this.applyTransaction(portfolio, transaction),
        portfolio
      );
  }

  //=====
  // Apply specific transaction functions

  applyBuy(
    portfolio: PortfolioFromDb,
    transaction: Transaction
  ): PortfolioFromDb {
    let { holdings } = portfolio;
    const { subType, amount } = transaction;
    const transactionHolding = HoldingFromDb.fromTransaction(transaction);

    switch (subType) {
      case InvestmentTransactionSubtype.Buy: {
        holdings = this.holdingsUtil.upsertHolding(
          holdings,
          transactionHolding,
          (holding) => {
            return this.holdingsUtil.combineHoldings(
              holding,
              transactionHolding
            );
          }
        );
        break;
      }
    }

    return {
      ...portfolio,
      cash: portfolio.cash - amount,
      holdings,
    };
  }

  applySell(
    portfolio: PortfolioFromDb,
    transaction: Transaction
  ): PortfolioFromDb {
    let { cash, holdings } = portfolio;
    const { subType, amount } = transaction;

    switch (subType) {
      case InvestmentTransactionSubtype.Sell: {
        cash += amount;

        holdings = this.holdingsUtil.upsertHolding(
          holdings,
          HoldingFromDb.fromTransaction(transaction),
          (holding) => {
            const newQuantity = holding.quantity - transaction.quantity;
            return {
              ...holding,
              quantity: newQuantity,
              costBasis: holding.averagePrice * newQuantity,
            };
          }
        );

        break;
      }
    }

    return {
      ...portfolio,
      cash,
      holdings,
    };
  }

  applyCash(
    portfolio: PortfolioFromDb,
    transaction: Transaction
  ): PortfolioFromDb {
    let { cash } = portfolio;
    const { amount, subType } = transaction;
    switch (subType) {
      case InvestmentTransactionSubtype.Deposit: {
        cash += amount;
        break;
      }
      case InvestmentTransactionSubtype.Withdrawal: {
        cash -= amount;
        break;
      }
    }
    return {
      ...portfolio,
      cash,
    };
  }
}
