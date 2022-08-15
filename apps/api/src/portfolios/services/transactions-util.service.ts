import { Injectable } from '@nestjs/common';
import {
  InvestmentsTransactionsGetResponse,
  InvestmentTransactionSubtype,
  InvestmentTransactionType,
} from 'plaid';
import { HoldingFromDb, PortfolioFromDb, Transaction } from '../entities';
import { HoldingsUtilService } from './holdings-util.service';

@Injectable()
export class TransactionsUtilService {
  constructor(private holdingsUtil: HoldingsUtilService) {}

  /**
   * Returns a map of accountId to Transactions given a plaid response
   */
  fromPlaidResponse(response: InvestmentsTransactionsGetResponse): {
    [accountId: string]: Transaction[];
  } {
    const { investment_transactions, securities, accounts } = response;
    return accounts.reduce((acc, curr) => {
      return {
        [curr.account_id]: investment_transactions
          .filter((t) => t.account_id === curr.account_id)
          .map(
            (t) =>
              ({
                name: t.name,
                currency: t.iso_currency_code,
                date: new Date(t.date),
                price: t.price,
                type: t.type,
                subType: t.subtype,
                quantity: t.quantity,
                // TODO: find the baggers security using OpenFIGI
                baggersSecurity: undefined,
                plaidTransactionId: t.investment_transaction_id,
                importedSecurity: securities.find(
                  (s) => s.security_id === t.security_id
                ),
              } as Transaction)
          ),
      };
    }, {});
  }

  /**
   * Applies a transaction to a given portfolio and merges the resulting holdings.
   */
  applyTransaction(
    portfolio: PortfolioFromDb,
    transaction: Transaction
  ): PortfolioFromDb {
    const p = this.applyTransactionLazy(portfolio, transaction);
    return {
      ...p,
      holdings: this.holdingsUtil.getMergedHoldings(p.holdings),
    };
  }

  /**
   * The inner brains of `applyTransaction` - the difference being that this method
   * does not merge the resulting holdings.
   * Intended for internal use only, by `applyTransactions` - this ensures we do
   * not waste too many CPU cycles merging on every transaction, and instead
   * we can merge just once at the very end.
   */
  private applyTransactionLazy(
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
          this.applyTransactionLazy(portfolio, transaction),
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
