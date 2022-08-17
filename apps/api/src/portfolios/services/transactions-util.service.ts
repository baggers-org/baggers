import { Injectable } from '@nestjs/common';
import { InvestmentTransactionSubtype, InvestmentTransactionType } from 'plaid';
import { HoldingFromDb, PortfolioFromDb, Transaction } from '../entities';
import { HoldingsUtilService } from './holdings-util.service';

@Injectable()
export class TransactionsUtilService {
  constructor(private holdingsUtil: HoldingsUtilService) {}

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
    const { subType, amount, security } = transaction;
    // We ignore transactions that we have not matched
    if (!security) {
      return portfolio;
    }

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
    const { subType, amount, security } = transaction;

    if (!security) {
      return portfolio;
    }

    switch (subType) {
      case InvestmentTransactionSubtype.Sell: {
        holdings = this.holdingsUtil.updateHolding(
          holdings,
          HoldingFromDb.fromTransaction(transaction),
          (holding) => {
            const newQuantity = holding.quantity + transaction.quantity;
            cash -= amount;
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
    const { cash } = portfolio;
    const { amount } = transaction;
    return {
      ...portfolio,
      cash: cash + amount,
    };
  }
}
