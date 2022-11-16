import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PlaidAccount, PlaidItem } from '~/plaid-items';
import {
  Holding,
  PopulatedHolding,
  PopulatedHoldingWithMetrics,
} from './holding.entity';
import { PopulatedTransaction, Transaction } from './transaction';
import { OwnedDocument } from '~/users';

export type PortfolioDocument = Portfolio & Document;

@Schema({ collection: 'portfolios' })
@ObjectType('PortfolioFromDb')
export class Portfolio extends OwnedDocument {
  @Prop({ default: true })
  private: boolean;

  @Prop({ default: `` })
  name: string;

  @Prop({ default: `` })
  description?: string;

  @Prop({ type: Holding, default: [] })
  @Field(() => [Holding])
  holdings: Holding[];

  @Prop({ type: Transaction, default: [] })
  @Field(() => [Transaction])
  transactions: Transaction[];

  @Field(() => PlaidItem, { nullable: true })
  @Prop({ type: String, ref: 'PlaidItem' })
  plaidItem?: PlaidItem | string;

  @Field(() => PlaidAccount)
  @Prop(() => PlaidAccount)
  plaidAccount?: PlaidAccount;
}
@ObjectType()
export class PopulatedPortfolio extends OmitType(Portfolio, [
  'holdings',
  'transactions',
]) {
  @Field(() => [PopulatedHolding])
  holdings: PopulatedHolding[];

  @Field(() => [PopulatedTransaction])
  transactions: PopulatedTransaction[];
}

@ObjectType()
export class PortfolioWithMetrics extends Portfolio {
  cash: number;
  totalValue: number;
}

@ObjectType()
export class PortfolioSummary extends OmitType(PortfolioWithMetrics, [
  'holdings',
  'transactions',
]) {
  @Field(() => [PopulatedHoldingWithMetrics])
  top5Holdings: PopulatedHoldingWithMetrics[];
}

@ObjectType('Portfolio')
export class PopulatedPortfolioWithMetrics extends OmitType(
  PortfolioWithMetrics,
  ['holdings', 'transactions']
) {
  @Field(() => [PopulatedHoldingWithMetrics])
  holdings: PopulatedHoldingWithMetrics[];

  @Field(() => [PopulatedTransaction])
  transactions: PopulatedTransaction[];
}
export const PortfolioSchema =
  SchemaFactory.createForClass(Portfolio);
