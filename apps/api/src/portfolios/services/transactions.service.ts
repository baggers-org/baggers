import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth0AccessTokenPayload } from '~/auth';
import { SecuritiesService } from '~/securities';
import { ObjectId } from '~/shared';
import { ownerAnd } from '~/shared/util/ownerAnd';
import { AddTransactionInput } from '../dto/add-transaction.input';
import {
  Portfolio,
  PortfolioDocument,
  Transaction,
} from '../entities';
import { TransactionsUtilService } from './transactions-util.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Portfolio.name)
    private portfolioModel: Model<PortfolioDocument>,
    private transactionsUtil: TransactionsUtilService,
    private securitiesService: SecuritiesService
  ) {}

  async addTransaction(
    input: AddTransactionInput,
    currentUser: Auth0AccessTokenPayload
  ) {
    const { portfolioId } = input;
    // Lookup the security, to get its details for the transaction
    const security = await this.securitiesService.findById(
      input.security
    );
    const newTransaction: Transaction = {
      ...input,
      assetClass: security.assetClass,
      name: this.transactionsUtil.getTransactionName(
        input.subType,
        security
      ),
      currency: input.currency || 'USD',
      fees: input.fees || 0,
      date: input.date || new Date(),
      _id: new ObjectId(),
    };

    const portfolio = await this.portfolioModel
      .findOne(
        ownerAnd<PortfolioDocument>(currentUser, {
          _id: portfolioId,
        })
      )
      .orFail(
        () =>
          new NotFoundException(
            'Could not find a portfolio to add a transaction to'
          )
      );

    const { holdings } = this.transactionsUtil.applyTransaction(
      portfolio,
      newTransaction
    );

    return portfolio.update(
      {
        $set: {
          holdings,
        },
        $push: {
          transactions: newTransaction,
        },
      },
      {
        new: true,
      }
    );
  }

  // async addTransactions(
  //   input: AddTransactionInput[],
  //   currentUser: Auth0AccessTokenPayload
  // ) {
  //   const portfolioIds = [...new Set(input.map((i) => i.portfolioId))];

  //   await Promise.all(
  //     portfolioIds.map(async (id) => {
  //       await this.portfolioModel
  //         .findOneAndUpdate(
  //           ownerAnd<PortfolioDocument>(currentUser, {
  //             _id: id,
  //           }),
  //           {
  //             transactions: {
  //               $push: input.filter((i) => i.portfolioId === id),
  //             },
  //           }
  //         )
  //         .orFail(
  //           () =>
  //             new NotFoundException(
  //               'Could not find a portfolio to add a transaction to'
  //             )
  //         );
  //     })
  //   );
  // }
}
