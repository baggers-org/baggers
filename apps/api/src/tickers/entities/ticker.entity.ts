import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseDocument } from '~/shared/classes/base-document';
import { Quote } from './quote.entity';

export type TickerDocument = Document & Ticker;

@ObjectType()
@Schema()
export class Ticker extends BaseDocument {
  @Prop()
  symbol: string;

  @Prop()
  iexId?: string;

  @Prop()
  figi?: string;

  @Prop()
  cik?: string;

  @Prop()
  name: string;

  @Prop()
  symbolType: string;

  @Prop()
  exchange: string;

  @Prop()
  exchangeName: string;

  @Prop()
  region: string;

  @Prop()
  currency: string;

  @Field(() => Quote)
  @Prop()
  quote?: Quote;
}

export const TickerSchema = SchemaFactory.createForClass(Ticker);
