import { Auth0AccessTokenPayload } from '~/auth';
import { ObjectId } from '~/shared';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddHoldingInput } from '../dto/add-holding';
import { Holding, Portfolio, PortfolioDocument } from '../entities';
import { HoldingSource } from '../enums';
import { HoldingsUtilService } from './holdings-util.service';

@Injectable()
export class HoldingsService {
  constructor(
    @InjectModel(Portfolio.name)
    private portfolioModel: Model<PortfolioDocument>,
    private holdingsUtil: HoldingsUtilService
  ) {}

  async addHolding(
    toPortfolio: ObjectId,
    input: AddHoldingInput,
    currentUser: Auth0AccessTokenPayload
  ) {
    const newHolding: Holding = {
      ...input,
      _id: new ObjectId(),
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

    return this.holdingsUtil.mergePortfolioHoldings(portfolio);
  }

  async removeHolding(
    portfolioId: ObjectId,
    holdingId: ObjectId,
    currentUser: Auth0AccessTokenPayload
  ) {
    const res = await this.portfolioModel
      .findOneAndUpdate(
        {
          _id: portfolioId,
          owner: currentUser.sub,
        },
        {
          $pull: { holdings: { _id: holdingId } },
          $set: {
            updatedAt: Date.now(),
          },
        }
      )
      .orFail(() => new NotFoundException(`Could not remove the holding`));
    return res._id;
  }
}
