import { ObjectId, ObjectIdScalar } from '@baggers/api-shared';
import { Field, InputType } from '@nestjs/graphql';
import { HoldingDirection, HoldingType } from '../enums';

@InputType()
export class AddHoldingInput {
  @Field(() => ObjectIdScalar)
  security: ObjectId;

  @Field()
  quantity: number;

  @Field()
  averagePrice: number;

  @Field({ defaultValue: 0 })
  brokerFees?: number;

  @Field(() => HoldingType, { defaultValue: HoldingType.shares })
  type: HoldingType;

  @Field(() => HoldingDirection)
  direction?: HoldingDirection;

  @Field({ defaultValue: 'USD' })
  currency?: string;
}
