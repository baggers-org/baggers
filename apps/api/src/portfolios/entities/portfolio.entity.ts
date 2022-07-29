import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseDocument } from '~/shared/classes/base-document';
import { User } from '~/users/entities/user.entity';
import {
  HoldingFromDb,
  PopulatedHolding,
  PopulatedHoldingWithMetrics,
} from './holding.entity';
import { Transaction } from './transaction.entity';

export type PortfolioDocument = PortfolioFromDb & Document;

/**
 * Test
 */
@Schema({ collection: 'portfolios' })
@ObjectType('PortfolioWithoutMarketData', {
  description: `
# Test
`,
})
export class PortfolioFromDb extends BaseDocument {
  @Field(() => User)
  @Prop({ ref: 'User', type: () => String })
  owner: User | string;

  @Prop({ default: true })
  private: boolean;

  @Prop({ default: `` })
  name: string;

  @Prop({ default: `` })
  description: string;

  @Prop({ default: 0 })
  cash: number;

  @Field(() => [HoldingFromDb])
  @Prop({ type: HoldingFromDb, default: [] })
  holdings: HoldingFromDb[];

  @Field(() => [Transaction])
  @Prop({ type: Transaction, default: [] })
  transactions: Transaction[];

  // @Field({ nullable: true })
  // @Prop({ type: PlaidItem })
  // plaid?: PlaidItem;
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
