import { prop } from '@typegoose/typegoose';
import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { Document } from './document';
import { Symbol } from './symbol';

export enum PositionDirection {
  long = `long`,
  short = `short`,
}
export enum PositionType {
  shares = `shares`,
  puts = `puts`,
  calls = `calls`,
}

registerEnumType(PositionDirection, {
  name: `PositionDirection`,
  description: `Buying vs selling`,
});
registerEnumType(PositionType, {
  name: `PositionType`,
  description: `Shares, calls, puts`,
});
@ObjectType()
export class Position extends Document {
  @Field(() => Symbol)
  @prop({ ref: () => Symbol })
  symbol: Symbol;

  @Field(() => PositionDirection)
  @prop({ enum: PositionDirection })
  direction?: PositionDirection;

  @Field()
  @prop({ default: 0.0 })
  exposure?: number;

  @Field()
  @prop({ default: 0.0 })
  averagePrice?: number;

  @Field()
  @prop({ default: 0.0 })
  marketValue?: number;

  @Field()
  @prop({ default: 0.0 })
  costBasis: number;

  @Field()
  @prop({ default: 0.0 })
  brokerFees?: number;

  @Field()
  @prop()
  positionSize: number;

  @Field()
  @prop({ default: 0.0 })
  profitLossUsd?: number;

  @Field()
  @prop({ default: 0.0 })
  profitLossPercent?: number;

  @Field()
  @prop({ default: 0.0 })
  dailyProfitLossUsd?: number;

  @Field({ nullable: true })
  @prop({ default: new Date() })
  openDate?: Date;

  @Field({ nullable: true })
  closeDate?: Date;

  @Field(() => PositionType)
  @prop({ enum: PositionType })
  positionType: PositionType;
}
