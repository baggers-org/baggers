import { prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';
import { Document } from './document';
import { Symbol } from './symbol';

@ObjectType()
export class Position extends Document {
  @Field(() => Symbol)
  @prop({ ref: () => Symbol })
  symbol: Symbol;

  @Field()
  @prop({ default: false })
  isShort?: boolean;

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
}
