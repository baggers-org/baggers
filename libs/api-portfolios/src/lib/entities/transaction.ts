import { ImportedSecurity, Security } from '@baggers/api-securities';
import { ObjectId } from '@baggers/api-shared';
import { User } from '@baggers/api-users';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import {
  Holding,
  InvestmentTransactionSubtype,
  InvestmentTransactionType,
} from 'plaid';
import { HoldingFromDb } from './holding.entity';
import { PortfolioFromDb } from './portfolio.entity';

@ObjectType()
export class Transaction {
  @Prop()
  @Field()
  name: string;

  @Prop(() => Date)
  @Field(() => Date)
  date: Date;

  @Prop()
  @Field()
  currency: string;

  @Prop()
  @Field()
  amount: number;

  @Prop({ default: 0 })
  @Field()
  fees?: number;

  @Prop()
  @Field()
  quantity?: number;

  @Prop()
  @Field()
  price?: number;

  @Field(() => InvestmentTransactionType)
  @Prop({ enum: InvestmentTransactionType, type: String })
  type: InvestmentTransactionType;

  @Field(() => InvestmentTransactionSubtype)
  @Prop({ enum: InvestmentTransactionSubtype, type: String })
  subType: InvestmentTransactionSubtype;

  @Field(() => Security, { nullable: true })
  @Prop({ type: ObjectId, ref: 'Security' })
  baggersSecurity?: Security | ObjectId;

  @Field(() => ImportedSecurity)
  @Prop(() => ImportedSecurity)
  importedSecurity?: ImportedSecurity;

  @Field({ description: 'This is the transaction_id from plaid' })
  @Prop()
  plaidTransactionId?: string;

  @Field(() => User, { nullable: true })
  @Prop({ type: ObjectId, ref: 'User' })
  createdBy?: User;

  static modifyRelevantHolding(
    holdings: HoldingFromDb[],
    transaction: Transaction,
    updateFn: (holding: HoldingFromDb) => HoldingFromDb
  ): HoldingFromDb[] {
    const index = holdings.findIndex(
      (h) => h.security === transaction.baggersSecurity._id
    );
    if (holdings[index]) {
      return [
        ...holdings.slice(0, index),
        updateFn(holdings[index]),
        ...holdings.slice(index + 1, holdings.length),
      ];
    }
  }

  /**
   * Applies a buy transaction to a portfolio
   */
  static applyBuy(
    portfolio: PortfolioFromDb,
    transaction: Transaction
  ): PortfolioFromDb {
    let { holdings } = portfolio;
    const { subType, amount } = transaction;

    switch (subType) {
      case InvestmentTransactionSubtype.Buy: {
        holdings = [...holdings, HoldingFromDb.fromTransaction(transaction)];
        break;
      }
    }

    return {
      ...portfolio,
      cash: portfolio.cash - amount,
      holdings,
    };
  }
  static applySell(
    portfolio: PortfolioFromDb,
    transaction: Transaction
  ): PortfolioFromDb {
    let { cash, holdings } = portfolio;
    const { subType, amount } = transaction;

    switch (subType) {
      case InvestmentTransactionSubtype.Sell: {
        cash += amount;

        holdings = Transaction.modifyRelevantHolding(
          holdings,
          transaction,
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

      case InvestmentTransactionSubtype.SellShort: {
        holdings = [...holdings, HoldingFromDb.fromTransaction(transaction)];
        break;
      }
    }

    return {
      ...portfolio,
      cash,
      holdings,
    };
  }

  static applyCash(
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
