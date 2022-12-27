import { Field, InputType } from '@nestjs/graphql';
import { HoldingDirection } from '../enums';

@InputType()
export class AddHoldingInput {
  @Field()
  security: string;

  @Field()
  quantity: number;

  @Field()
  costBasis: number;

  @Field(() => HoldingDirection)
  direction?: HoldingDirection;

  @Field()
  currency: string;

  @Field(() => Date, { nullable: true })
  transactionDate?: Date;
}
