import { Injectable } from '@nestjs/common';
import { InvestmentTransactionSubtype, InvestmentTransactionType } from 'plaid';
import { SecurityType } from '~/securities/enums/security-type.enum';
import { Transaction, Holding, Portfolio } from '../entities';
import { HoldingsUtilService } from './holdings-util.service';

@Injectable()
export class TransactionsUtilService {
  constructor(private holdingsUtil: HoldingsUtilService) {}

  applyTransaction(portfolio: Portfolio, transaction: Transaction): Portfolio {
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

  applyTransactions(portfolio: Portfolio): Portfolio {
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

  applyBuy(portfolio: Portfolio, transaction: Transaction): Portfolio {
    let { holdings } = portfolio;
    const { subType, amount, security } = transaction;
    // We ignore transactions that we have not matched
    if (!security) {
      return portfolio;
    }

    const newHolding = Holding.fromTransaction(transaction);

    switch (subType) {
      case InvestmentTransactionSubtype.Buy: {
        holdings = this.holdingsUtil.upsertHolding(
          holdings,
          newHolding,
          (holding) => {
            return this.holdingsUtil.combineHoldings(newHolding, holding);
          }
        );
        break;
      }
    }

    holdings = this.holdingsUtil.modifyCashLevels(
      holdings,
      // Positive amounti n the tranascation, represents a debit to the asset
      // NOT the cash, so if its positive, it needs to be negated
      -amount,
      transaction.currency
    );

    return {
      ...portfolio,
      holdings,
    };
  }

  applySell(portfolio: Portfolio, transaction: Transaction): Portfolio {
    let { holdings } = portfolio;
    const { subType, security } = transaction;

    if (!security) {
      return portfolio;
    }

    let newCash = 0;

    switch (subType) {
      case InvestmentTransactionSubtype.Sell: {
        holdings = this.holdingsUtil.updateHolding(
          holdings,
          Holding.fromTransaction(transaction),
          (holding) => {
            const newQuantity = holding.quantity + transaction.quantity;
            // Sell will need to be negated
            newCash = -transaction.amount;
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
    holdings = this.holdingsUtil.modifyCashLevels(
      holdings,
      newCash,
      transaction.currency
    );

    return {
      ...portfolio,
      holdings,
    };
  }

  applyCash(portfolio: Portfolio, transaction: Transaction): Portfolio {
    const { amount } = transaction;

    const holdings = this.holdingsUtil.modifyCashLevels(
      portfolio.holdings,
      amount,
      transaction.currency
    );

    return {
      ...portfolio,
      holdings,
    };
  }
}
