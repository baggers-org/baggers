import { Injectable } from '@nestjs/common';
import { PortfolioDocument, HoldingFromDb } from '../entities';

@Injectable()
export class HoldingsUtilService {
  /**
   * Given 2 holdings, returns the result of owning both holdings
   */
  combineHoldings(holding1: HoldingFromDb, holding2: HoldingFromDb) {
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
    holdingsToSearch: HoldingFromDb[],
    holdingToFind: HoldingFromDb
  ): number {
    const holdingHash = this.hashHolding(holdingToFind);
    return holdingsToSearch.findIndex(
      (h) => this.hashHolding(h) === holdingHash
    );
  }

  findHolding(
    holdingsToSearch: HoldingFromDb[],
    holdingToFind: HoldingFromDb
  ): HoldingFromDb {
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

  hashHolding(holding: HoldingFromDb) {
    return `${holding.security}${holding.direction}${holding.type}`;
  }

  /**
   * Merges together duplicate holdings for the same security + direction
   */
  getMergedHoldings(holdings: HoldingFromDb[]) {
    const mergedHoldings: HoldingFromDb[] = [];

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
    holdings: HoldingFromDb[],
    holdingToUpsert: HoldingFromDb,
    updateFn: (holding: HoldingFromDb) => HoldingFromDb
  ): HoldingFromDb[] {
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
    holdings: HoldingFromDb[],
    holdingToUpsert: HoldingFromDb,
    updateFn: (holding: HoldingFromDb) => HoldingFromDb
  ): HoldingFromDb[] {
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
