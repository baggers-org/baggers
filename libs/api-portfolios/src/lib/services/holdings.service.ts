import { Auth0AccessTokenPayload } from '@baggers/api-auth';
import { ObjectId } from '@baggers/api-shared';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddHoldingInput } from '../dto/add-holding';
import { HoldingFromDb, PortfolioDocument, PortfolioFromDb } from '../entities';
import { HoldingSource } from '../enums';

@Injectable()
export class HoldingsService {
  constructor(
    @InjectModel(PortfolioFromDb.name)
    private portfolioModel: Model<PortfolioDocument>
  ) {}

  getMergedHoldings(holdings: HoldingFromDb[]) {
    const mergedHoldings: HoldingFromDb[] = [];

    const hash = (holding: HoldingFromDb) =>
      `${holding.ticker}${holding.direction}${holding.type}`;

    const seen = {};

    const newHoldings = holdings.filter((holding, index) => {
      const holdingHash = hash(holding);
      if (!seen[holdingHash]) {
        seen[holdingHash] = holding;
        const match = holdings.find(
          (h2, index2) => hash(h2) === holdingHash && index !== index2
        );
        if (match) {
          const newCostBasis = holding.costBasis + match.costBasis;
          const newQuanity = holding.quantity + match.quantity;
          const newAverage = newCostBasis / newQuanity;
          mergedHoldings.push({
            ...holding,
            costBasis: +newCostBasis.toFixed(2),
            averagePrice: +newAverage.toFixed(2),
            quantity: +newQuanity.toFixed(2),
          });
          return false;
        }
        return true;
      }
      return false;
    });
    return [...newHoldings, ...mergedHoldings];
  }

  /**
   * ensures no duplicate holdings are in a given portfolio
   * merging duplicate holdings.
   */
  async mergeHoldings(portfolio: PortfolioDocument) {
    const { holdings } = portfolio;
    const mergedHoldings = this.getMergedHoldings(holdings);
    if (mergedHoldings.length !== holdings.length) {
      portfolio.holdings = mergedHoldings;
      return portfolio.save();
    }
    return portfolio;
  }

  async addHolding(
    toPortfolio: ObjectId,
    input: AddHoldingInput,
    currentUser: Auth0AccessTokenPayload
  ) {
    const newHolding: HoldingFromDb = {
      ...input,
      costBasis: input.averagePrice * input.quantity + input.brokerFees,
      source: HoldingSource.direct,
    };

    const portfolio = await this.portfolioModel
      .findOneAndUpdate(
        {
          _id: toPortfolio,
          owner: currentUser.sub,
        },
        {
          $push: {
            holdings: newHolding,
          },
          $set: {
            updatedAt: Date.now(),
          },
        },
        {
          new: true,
        }
      )
      .orFail(
        () =>
          new NotFoundException(
            `Could not find a portfolio to add a holding to`
          )
      );

    return this.mergeHoldings(portfolio);
  }
}
