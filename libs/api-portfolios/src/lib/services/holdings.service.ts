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

    return this.mergePortfolioHoldings(portfolio);
  }
}
