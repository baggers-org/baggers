import { ObjectId, ObjectIdScalar } from '~/shared';
import { Field, InputType } from '@nestjs/graphql';
import { HoldingDirection } from '../enums';
import { SecurityType } from '~/securities/enums/security-type.enum';

@InputType()
export class AddHoldingInput {
  @Field(() => ObjectIdScalar)
  security: ObjectId;

  @Field(() => SecurityType)
  securityType: SecurityType;

  @Field()
  quantity: number;

  @Field()
  averagePrice: number;

  @Field({ defaultValue: 0 })
  brokerFees?: number;

  @Field(() => HoldingDirection)
  direction?: HoldingDirection;

  @Field()
  currency: string;

  @Field(() => Date, { nullable: true })
  transactionDate?: Date;
}
