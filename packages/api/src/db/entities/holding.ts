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

registerEnumType(HoldingDirection, {
  name: `HoldingDirection`,
  description: `Buying vs selling`,
});
registerEnumType(HoldingType, {
  name: `HoldingType`,
  description: `Shares, calls, puts`,
});
@ObjectType()
export class Holding extends Document {
  @Field(() => Symbol)
  @prop({ ref: () => Symbol })
  symbol: Symbol | ObjectId;

  @Field()
  @prop({ default: 0.0 })
  averagePrice?: number;

  @Field()
  @prop({ default: 0.0 })
  costBasis: number;

  @Field()
  @prop({ default: `USD` })
  currency?: string;

  @Field()
  @prop({ default: 0.0 })
  brokerFees?: number;

  @Field()
  @prop()
  quantity: number;

  @Field(() => HoldingType)
  @prop({ enum: HoldingType })
  holdingType: HoldingType;

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
