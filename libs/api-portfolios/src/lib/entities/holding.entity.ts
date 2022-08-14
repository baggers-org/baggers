import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';
import { HoldingDirection } from '../enums/holding-direction.enum';
import { HoldingSource } from '../enums/holding-source.enum';
import { HoldingType } from '../enums/holding-type.enum';
import { Security } from '@baggers/api-securities';
import { Transaction } from './transaction';
import { InvestmentTransactionSubtype, InvestmentTransactionType } from 'plaid';

@ObjectType('HoldingWithoutMarketData')
export class HoldingFromDb {
  @Field(() => Security)
  @Prop({ type: Schema.Types.ObjectId, ref: 'Security' })
  security: Security | ObjectId;

  @Prop({ default: 0.0 })
  averagePrice: number;

  @Prop({ default: 0.0 })
  costBasis: number;

  @Prop({ default: `USD` })
  currency?: string;

  @Prop({ default: 0.0 })
  brokerFees?: number;

  @Field(() => HoldingDirection)
  @Prop({
    enum: HoldingDirection,
    default: HoldingDirection.long,
    type: String,
  })
  direction?: HoldingDirection;

  @Field()
  @Prop()
  quantity: number;

  @Field(() => HoldingType)
  @Prop({ enum: HoldingType, type: String, default: HoldingType.shares })
  type?: HoldingType;

  @Field(() => HoldingSource)
  @Prop({ enum: HoldingSource, type: String })
  source: HoldingSource;

  static fromTransaction(transaction: Transaction): HoldingFromDb {
    const shortTypes = [InvestmentTransactionSubtype.SellShort];
    return {
      averagePrice: transaction.price,
      costBasis: transaction.price * transaction.quantity,
      direction: shortTypes.includes(transaction.subType)
        ? HoldingDirection.short
        : HoldingDirection.long,
      quantity: transaction.quantity,
      security: transaction.baggersSecurity,
      source: transaction.plaidTransactionId
        ? HoldingSource.broker
        : HoldingSource.transactions,
    };
  }
}

@ObjectType()
export class HoldingWithMetrics extends HoldingFromDb {
  exposure: number;

  marketValue: number;

  profitLossUsd: number;

  profitLossPercent: number;

  dailyProfitLossUsd: number;
}

@ObjectType()
export class PopulatedHolding extends HoldingFromDb {
  @Field(() => Security)
  security: Security;
}

// To our GraphQL - this is what will always be returned, the naming is just
// a distinction to our API codebase
@ObjectType('Holding')
export class PopulatedHoldingWithMetrics extends HoldingWithMetrics {
  @Field(() => Security)
  security: Security;
}
