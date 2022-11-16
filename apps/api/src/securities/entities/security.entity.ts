import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AssetClass } from '../enums/asset-class.enum';
import { TickerDetails } from './ticker-details.entity';

export type SecurityDocument = Document & Security;

@ObjectType()
@Schema()
export class Security {
  @Prop()
  _id: string;

  @Prop()
  figi?: string;

  @Prop()
  name?: string;

  @Field(() => AssetClass)
  @Prop({ enum: AssetClass, type: String })
  assetClass: AssetClass;

  @Prop()
  exchange?: string;

  @Prop()
  region?: string;

  @Prop()
  currency?: string;

  @Prop()
  latestPrice?: number;

  @Prop()
  todaysChange?: number;

  @Prop()
  todaysChangePercent?: number;

  @Field(() => TickerDetails)
  @Prop({ type: TickerDetails })
  tickerDetails?: TickerDetails;

  @Prop({ default: false })
  isImported?: boolean;
}

export const SecuritySchema = SchemaFactory.createForClass(Security);
SecuritySchema.index({ symbol: 1, exchange: 1 });
SecuritySchema.index({ symbol: 1, figi: 1 });
