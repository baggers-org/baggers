import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';
import { HoldingDirection } from '../enums/holding-direction.enum';
import { HoldingSource } from '../enums/holding-source.enum';
import { HoldingType } from '../enums/holding-type.enum';
import { Ticker } from '@baggers/api-tickers';

@ObjectType('HoldingWithoutMarketData')
export class HoldingFromDb {
  @Field(() => Ticker)
  @Prop({ type: Schema.Types.ObjectId, ref: 'Ticker' })
  ticker: Ticker | ObjectId;

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
  @Prop({ enum: HoldingType, type: String })
  type: HoldingType;

  @Field(() => HoldingSource)
  @Prop({ enum: HoldingSource, type: String })
  source: HoldingSource;
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
  @Field(() => Ticker)
  ticker: Ticker;
}

// To our GraphQL - this is what will always be returned, the naming is just
// a distinction to our API codebase
@ObjectType('Holding')
export class PopulatedHoldingWithMetrics extends HoldingWithMetrics {
  @Field(() => Ticker)
  ticker: Ticker;
}
