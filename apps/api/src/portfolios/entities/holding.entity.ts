import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { HoldingDirection } from '../enums/holding-direction.enum';
import { HoldingSource } from '../enums/holding-source.enum';
import { ImportedSecurity, Security } from '@api/securities';
import { BaseDocument, ObjectId } from '@api/shared';
import { AssetClass } from '@api/securities/enums/asset-class.enum';
import { Transaction } from './transaction';
import { InvestmentTransactionSubtype } from 'plaid';

@ObjectType('HoldingFromDb')
export class Holding extends BaseDocument {
  @Field(() => Security)
  @Prop({ type: String, ref: 'Security' })
  security?: Security | string;

  @Field(() => AssetClass)
  @Prop({ enum: AssetClass, type: String })
  assetClass: AssetClass;

  @Field(() => ImportedSecurity)
  @Prop()
  importedSecurity?: ImportedSecurity;

  @Prop()
  institutionValue?: number;

  @Prop()
  plaidAccountId?: string;

  @Prop({ default: 0.0 })
  averagePrice?: number;

  @Prop({ default: 0.0 })
  costBasis?: number;

  @Prop()
  currency: string;

  @Prop({ default: 0.0 })
  brokerFees?: number;

  @Field(() => HoldingDirection)
  @Prop({
    enum: HoldingDirection,
    default: HoldingDirection.long,
    type: String,
  })
  direction?: HoldingDirection;

  @Prop()
  quantity: number;

  @Field(() => HoldingSource)
  @Prop({ enum: HoldingSource, type: String })
  source: HoldingSource;

  static fromTransaction(transaction: Transaction): Holding {
    const shortTypes = [InvestmentTransactionSubtype.SellShort];
    return {
      _id: new ObjectId(),
      averagePrice: transaction.price || 1,
      brokerFees: transaction.fees,
      plaidAccountId: transaction.plaidAccountId,
      importedSecurity: transaction.importedSecurity,
      currency: transaction.currency,
      costBasis:
        transaction.price * transaction.quantity +
          (transaction.fees || 0) || 1,
      direction: shortTypes.includes(transaction.subType)
        ? HoldingDirection.short
        : HoldingDirection.long,
      quantity: transaction.quantity,
      security: transaction.security,
      assetClass: transaction.assetClass,
      source: transaction.plaidTransactionId
        ? HoldingSource.broker
        : HoldingSource.transactions,
    };
  }

  static unpopulate(holding: PopulatedHolding): Holding {
    return {
      ...holding,
      security: holding.security._id,
    };
  }
}

@ObjectType()
export class PopulatedHolding extends Holding {
  @Field(() => Security, { nullable: true })
  security?: Security | null;
}

// To our GraphQL - this is what will always be returned, the naming is just
// a distinction to our API codebase
@ObjectType('Holding')
export class PopulatedHoldingWithMetrics extends PopulatedHolding {
  @Field(() => Security)
  security?: Security;

  exposure: number;

  marketValue?: number;

  profitLossUsd?: number;

  profitLossPercent?: number;

  dailyProfitLossUsd?: number;
}
