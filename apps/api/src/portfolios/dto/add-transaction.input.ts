import { Field, InputType } from '@nestjs/graphql';
import { InvestmentTransactionSubtype, InvestmentTransactionType } from 'plaid';
import { SecurityType } from '~/securities/enums/security-type.enum';
import { ObjectId, ObjectIdScalar } from '~/shared';

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

  @Field(() => ObjectIdScalar)
  security: ObjectId;

  @Field(() => SecurityType)
  securityType: SecurityType;
}
