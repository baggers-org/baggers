import { ObjectId } from 'mongodb';
import { Field, InputType } from 'type-graphql';
import { Portfolio } from '../entities';
import { Holding, HoldingDirection, HoldingType } from '../entities/holding';
import { ObjectIdScalar } from '../object-id.scalar';

@InputType()
export class AddHoldingInput implements Partial<Holding> {
  @Field(() => ObjectIdScalar)
  symbol: ObjectId;

  @Field()
  quantity: number;

  @Field()
  averagePrice: number;

  @Field({ nullable: true })
  brokerFees?: number;

  @Field(() => HoldingType)
  type?: HoldingType;

  @Field(() => HoldingDirection)
  direction?: HoldingDirection;

  @Field({ nullable: true })
  currency?: string;
}

@InputType()
export class UpdatePortfolioInput implements Partial<Portfolio> {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  cash?: number;

  @Field({ nullable: true })
  private?: boolean;
}
