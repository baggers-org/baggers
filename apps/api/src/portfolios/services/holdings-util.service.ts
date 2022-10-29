import { Injectable } from '@nestjs/common';
import { Security } from '~/securities';
import { AssetClass } from '~/securities/enums/asset-class.enum';
import { ObjectId } from '~/shared';
import { Holding, PortfolioDocument } from '../entities';
import { HoldingDirection, HoldingSource } from '../enums';

@Injectable()
export class HoldingsUtilService {
  createCashHolding(currency: string, amount: number): Holding {
    return {
      _id: new ObjectId(),
      currency,
      quantity: amount,
      assetClass: AssetClass.cash,
      source: HoldingSource.transactions,
      direction: HoldingDirection.long,
    };
  }
  /**
   * Given 2 holdings, returns the result of owning both holdings
   */
  combineHoldings(holding1: Holding, holding2: Holding) {
    if (holding1.direction !== holding2.direction)
      throw new Error(
        'These holdings cannot be combined they have different directions'
      );

    const newCostBasis = holding1.costBasis + holding2.costBasis;
    const newQuantity = holding1.quantity + holding2.quantity;
    const newAverage = newCostBasis / newQuantity;

    return {
      ...holding1,
      costBasis: +newCostBasis.toFixed(2),
      averagePrice: +newAverage.toFixed(2),
      quantity: +newQuantity.toFixed(2),
    };
  }

  findHoldingIndex(
    holdingsToSearch: Holding[],
    holdingToFind: Holding
  ): number {
    const holdingHash = this.hashHolding(holdingToFind);
    return holdingsToSearch.findIndex(
      (h) => this.hashHolding(h) === holdingHash
    );
  }
  findCashHoldingIndex(holdings: Holding[], currency: string): number {
    return holdings.findIndex(
      (h) => h.currency === currency && h.assetClass === AssetClass.cash
    );
  }

  findHolding(holdingsToSearch: Holding[], holdingToFind: Holding): Holding {
    const holdingHash = this.hashHolding(holdingToFind);
    return holdingsToSearch.find((h) => this.hashHolding(h) === holdingHash);
  }

  /**
   * ensures no duplicate holdings are in a given portfolio
   * merging duplicate holdings.
   */
  mergePortfolioHoldings(portfolio: PortfolioDocument) {
    const { holdings } = portfolio;
    const mergedHoldings = this.getMergedHoldings(holdings);
    if (mergedHoldings.length !== holdings.length) {
      portfolio.holdings = mergedHoldings;
      return portfolio.save();
    }
    return portfolio;
  }

  hashHolding(holding: Holding) {
    let securityId: ObjectId | string;
    const { security, importedSecurity } = holding;
    if (security) {
      if (security instanceof Security) {
        securityId = security._id;
      } else {
        securityId = security;
      }
    } else if (importedSecurity) {
      securityId = importedSecurity.security_id;
    }
    return `${securityId}${holding.direction}${holding.assetClass}${holding.currency}`;
  }

  /**
   *
   * @param holdings
   * @param amount  - Postive assumes a credit to the cash levels, negative assumes a debit to the cash levels
   * @param currency
   * @returns
   */
  modifyCashLevels(
    holdings: Holding[],
    amount: number,
    currency: string
  ): Holding[] {
    const cashIndex = this.findCashHoldingIndex(holdings, currency);
    const cashHolding: Holding = holdings[cashIndex];
    if (!cashHolding) {
      // Create the first cash holding
      return [...holdings, this.createCashHolding(currency, amount)];
    }

    return [
      ...holdings.slice(0, cashIndex),
      {
        ...cashHolding,
        quantity: cashHolding.quantity + amount,
      },
      ...holdings.slice(cashIndex + 1, holdings.length),
    ];
  }
  /**
   * Merges together duplicate holdings for the same security + direction
   */
  getMergedHoldings(holdings: Holding[]) {
    const mergedHoldings: Holding[] = [];

    const seen = {};

    const newHoldings = holdings.filter((holding, index) => {
      const holdingHash = this.hashHolding(holding);
      if (!seen[holdingHash]) {
        seen[holdingHash] = holding;
        const match = holdings.find(
          (h2, index2) =>
            this.hashHolding(h2) === holdingHash && index !== index2
        );
        if (match) {
          mergedHoldings.push(this.combineHoldings(holding, match));
          return false;
        }
        return true;
      }
      return false;
    });
    return [...newHoldings, ...mergedHoldings];
  }

  upsertHolding(
    holdings: Holding[] = [],
    holdingToUpsert: Holding,
    updateFn: (holding: Holding) => Holding
  ): Holding[] {
    const existingIndex = this.findHoldingIndex(holdings, holdingToUpsert);
    if (existingIndex >= 0) {
      return [
        ...holdings.slice(0, existingIndex),
        updateFn(holdings[existingIndex]),
        ...holdings.slice(existingIndex + 1, holdings.length),
      ];
    }
    return [...holdings, holdingToUpsert];
  }

  updateHolding(
    holdings: Holding[] = [],
    holdingToUpsert: Holding,
    updateFn: (holding: Holding) => Holding
  ): Holding[] {
    const existingIndex = this.findHoldingIndex(holdings, holdingToUpsert);
    if (existingIndex >= 0) {
      return [
        ...holdings.slice(0, existingIndex),
        updateFn(holdings[existingIndex]),
        ...holdings.slice(existingIndex + 1, holdings.length),
      ];
    }
  }
}
