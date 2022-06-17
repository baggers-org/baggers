import { prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { Document } from './document';
import { Symbol } from './symbol';

export enum HoldingDirection {
  long = `long`,
  short = `short`,
}
export enum HoldingType {
  shares = `shares`,
  puts = `puts`,
  calls = `calls`,
}

export enum HoldingSource {
  /** A direct holding is one that has been added directly to the portfolio
   * without any transaction data.
   * These holdings will not be included in analysis as they do not have any date/time
   * information associated with them
   * */
  direct = 'direct',
  /**
   * A transactions source means the holding has been generated from transaction data
   * stored on the portfolio.
   * These holdings will be included in analysis
   */
  transactions = 'transactions',

  /**
   * A broker source means this holding was generated from transaction data received
   * from the user's broker.
   * These holdings will be included in analysis
   */
  broker = 'broker',
}

registerEnumType(HoldingDirection, {
  name: `HoldingDirection`,
  description: `Buying vs selling`,
});
registerEnumType(HoldingType, {
  name: `HoldingType`,
  description: `Shares, calls, puts`,
});
registerEnumType(HoldingSource, {
  name: `HoldingSource`,
  description: `How the holding was created`,
});
@ObjectType()
export class Holding extends Document {
  @Field(() => Symbol)
  @prop({ ref: () => Symbol })
  symbol: Symbol | ObjectId;

  @Field()
  @prop({ default: 0.0 })
  averagePrice: number;

  @Field()
  @prop({ default: 0.0 })
  costBasis: number;

  @Field()
  @prop({ default: `USD` })
  currency?: string;

  @Field()
  @prop({ default: 0.0 })
  brokerFees?: number;

  @Field(() => HoldingDirection)
  @prop({ enum: HoldingDirection, default: HoldingDirection.long })
  direction?: HoldingDirection;

  @Field()
  @prop()
  quantity: number;

  @Field(() => HoldingType)
  @prop({ enum: HoldingType })
  type: HoldingType;

  @Field(() => HoldingSource)
  @prop({ enum: HoldingSource })
  source: HoldingSource;

  // Market data fields are not stored in the DB
  @Field()
  exposure: number;

  @Field()
  marketValue: number;

  @Field()
  profitLossUsd: number;

  @Field()
  profitLossPercent: number;

  @Field()
  dailyProfitLossUsd: number;
}
