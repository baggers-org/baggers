import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth0AccessTokenPayload } from '@api/auth';
import { ObjectId } from '@api/shared';
import { ownerAnd } from '@api/shared/util/ownerAnd';
import { AddTransactionInput } from '../dto/add-transaction.input';
import { Portfolio, PortfolioDocument } from '../entities';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Portfolio.name)
    private portfolioModel: Model<PortfolioDocument>
  ) {}

  addTransaction(
    input: AddTransactionInput,
    currentUser: Auth0AccessTokenPayload
  ) {
    const { portfolioId } = input;

    return this.portfolioModel
      .findOneAndUpdate(
        ownerAnd<PortfolioDocument>(currentUser, {
          _id: portfolioId,
        }),
        {
          $push: {
            transactions: {
              ...input,
              date: input.date || new Date(),
              _id: new ObjectId(),
            },
          },
        },
        {
          new: true,
        }
      )
      .orFail(
        () =>
          new NotFoundException(
            'Could not find a portfolio to add a transaction to'
          )
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
