import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Quote } from './quote.entity';
import { BaseDocument } from '~/shared';

export type SecurityDocument = Document & Security;

@ObjectType()
@Schema()
export class Security extends BaseDocument {
  @Prop()
  symbol?: string;

  @Prop()
  iexId?: string;

  @Prop()
  figi?: string;

  @Prop()
  cik?: string;

  @Prop()
  name?: string;

  @Prop()
  symbolType?: string;

  @Prop()
  exchange?: string;

  @Prop()
  exchangeName?: string;

  @Prop()
  region?: string;

  @Prop()
  currency?: string;

  @Field(() => Quote)
  @Prop()
  quote?: Quote;

  // From plaid
  close_price?: number;
}

export const SecuritySchema = SchemaFactory.createForClass(Security);
