import { Auth0AccessTokenPayload } from '~/auth';
import { ObjectId } from '~/shared';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddHoldingInput } from '../dto/add-holding';
import { Holding, Portfolio, PortfolioDocument } from '../entities';
import { HoldingDirection, HoldingSource } from '../enums';
import { HoldingsUtilService } from './holdings-util.service';
import { ownerAnd } from '~/shared/util/ownerAnd';
import { AddTransactionInput } from '../dto/add-transaction.input';
import { SecuritiesService } from '~/securities';
import { InvestmentTransactionSubtype, InvestmentTransactionType } from 'plaid';
import { TransactionsService } from './transactions.service';

@Injectable()
export class HoldingsService {
  constructor(
    @InjectModel(Portfolio.name)
    private portfolioModel: Model<PortfolioDocument>,
    private holdingsUtil: HoldingsUtilService,
    private securitiesService: SecuritiesService,
    private transactionsService: TransactionsService
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

    // Lookup the security, to get its details for the transaction

    const security = await this.securitiesService.findById(input.security);

    const transaction: AddTransactionInput = {
      amount: input.quantity * input.averagePrice,
      portfolioId: toPortfolio,
      price: input.averagePrice,
      quantity: input.quantity,
      security: input.security,
      assetClass: input.assetClass,
      currency: input.currency,
      fees: input.brokerFees || 0,
      date: input.transactionDate,
      name: `BUY ${security.name}`,
      type: InvestmentTransactionType.Buy,
      subType: InvestmentTransactionSubtype.Buy,
    };
    // Create the relevant transaction
    if (input.direction === HoldingDirection.short) {
      transaction.name = `SELL SHORT ${security.name}`;
      transaction.type = InvestmentTransactionType.Sell;
      transaction.subType = InvestmentTransactionSubtype.SellShort;
    }

    await this.transactionsService.addTransaction(transaction, currentUser);

    const portfolio = await this.portfolioModel
      .findOneAndUpdate(
        ownerAnd(currentUser, {
          _id: toPortfolio,
        }),

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
        ownerAnd(currentUser, {
          _id: portfolioId,
        }),
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
