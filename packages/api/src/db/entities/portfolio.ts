import { getModelForClass, index, prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';
import { Document } from './document';
import { PlaidItem } from './plaid';
import { Holding } from './holding';
import { User } from './user';
import { Transaction } from './transaction';

@ObjectType()
export class PortfolioPerformance {
  @Field()
  ytdReturnPercent: number;
  @Field()
  ytdReturnDollars: number;
  @Field()
  dailyReturnPercent: number;
  @Field()
  dailyReturnDollars: number;
}
@ObjectType()
@index({ owner: 1, private: 1 })
export class Portfolio extends Document {
  @Field(() => User)
  @prop({ ref: () => User, type: () => String })
  owner: User | string;

  @Field()
  @prop({ default: true })
  private: boolean;

  @Field()
  @prop({ default: `` })
  name: string;

  @Field()
  @prop({ default: `` })
  description: string;

  @Field()
  @prop({ default: 0 })
  cash: number;

  @Field(() => [Holding])
  @prop({ type: Holding, default: [] })
  holdings: Holding[];

  @Field(() => [Transaction])
  @prop({ type: Transaction, default: [] })
  transactions: Transaction[];

  @Field({ nullable: true })
  @prop({ type: PlaidItem })
  plaid?: PlaidItem;

  // Market value fields
  @Field()
  totalValue: number;

  @Field(() => PortfolioPerformance)
  performance?: PortfolioPerformance;
}

export const PortfolioModel = getModelForClass(Portfolio);
