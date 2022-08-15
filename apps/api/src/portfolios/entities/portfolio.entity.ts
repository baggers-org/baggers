import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PlaidItem } from '~/plaid-items';
import {
  HoldingFromDb,
  PopulatedHolding,
  PopulatedHoldingWithMetrics,
} from './holding.entity';
import { Transaction } from './transaction';
import { OwnedDocument } from '~/users';

export type PortfolioDocument = PortfolioFromDb & Document;

/**
 * Test
 */
@Schema({ collection: 'portfolios' })
@ObjectType('PortfolioWithoutMarketData')
export class PortfolioFromDb extends OwnedDocument {
  @Prop({ default: true })
  private: boolean;

  @Prop({ default: `` })
  name: string;

  @Prop({ default: `` })
  description?: string;

  @Prop({ default: 0 })
  cash: number;

  @Field(() => [HoldingFromDb])
  @Prop({ type: HoldingFromDb, default: [] })
  holdings: HoldingFromDb[];

  @Field(() => [Transaction])
  @Prop({ type: Transaction, default: [] })
  transactions: Transaction[];

  @Field(() => PlaidItem)
  @Prop({ type: String, ref: 'PlaidItem' })
  plaidItem?: PlaidItem | string;

  @Prop()
  plaidAccountId?: string;
}

@ObjectType()
export class PortfolioWithMetrics extends PortfolioFromDb {
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

@ObjectType()
export class PopulatedPortfolio extends PortfolioFromDb {
  @Field(() => [PopulatedHolding])
  holdings: PopulatedHolding[];
}

@ObjectType('Portfolio')
export class PopulatedPortfolioWithMetrics extends PortfolioWithMetrics {
  @Field(() => [PopulatedHoldingWithMetrics])
  holdings: PopulatedHoldingWithMetrics[];
}
export const PortfolioSchema = SchemaFactory.createForClass(PortfolioFromDb);
