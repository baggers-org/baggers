import { Field, InputType } from '@nestjs/graphql';
import {
  InvestmentTransactionSubtype,
  InvestmentTransactionType,
} from 'plaid';
import { AssetClass } from '@api/securities/enums/asset-class.enum';
import { ObjectId, ObjectIdScalar } from '@api/shared';

@InputType()
export class AddTransactionInput {
  @Field(() => ObjectIdScalar)
  portfolioId: ObjectId;

  @Field(() => Date, { defaultValue: () => new Date() })
  date?: Date;

  name: string;

  price?: number;

  fees?: number;

  amount: number;

  @Field({ defaultValue: 'USD' })
  currency?: string;

  quantity: number;

  @Field(() => InvestmentTransactionType)
  type: InvestmentTransactionType;

  @Field(() => InvestmentTransactionSubtype)
  subType: InvestmentTransactionSubtype;

  @Field()
  security: string;

  @Field(() => AssetClass)
  assetClass: AssetClass;
}
