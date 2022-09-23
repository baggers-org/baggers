import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Quote } from './quote.entity';
import { BaseDocument } from '~/shared';
import { SecurityType } from '../enums/security-type.enum';

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

  @Field(() => SecurityType)
  @Prop({ enum: SecurityType, type: String })
  type: SecurityType;

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
SecuritySchema.index({ symbol: 1, exchange: 1 });
SecuritySchema.index({ symbol: 1, figi: 1 });
