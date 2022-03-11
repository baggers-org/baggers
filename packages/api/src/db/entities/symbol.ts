import { getModelForClass, index, prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';
import { Document } from './document';
import { Quote } from './quote';

@ObjectType()
// TODO: compare performance for this index
@index({ symbol: 1, exchange: 1 })
export class Symbol extends Document {
  @Field()
  @prop()
  symbol: string;

  @Field()
  @prop()
  name: string;

  @Field()
  @prop()
  symbolType: string;

  @Field()
  @prop()
  exchange: string;

  @Field()
  @prop()
  exchangeName: string;

  @Field()
  @prop()
  region: string;

  @Field()
  @prop()
  currency: string;

  @Field(() => Quote, { nullable: false })
  @prop({ type: Quote })
  quote: Quote;
}

export const SymbolModel = getModelForClass(Symbol);
