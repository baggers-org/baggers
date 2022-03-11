import { ObjectId } from 'mongodb';
import { Field, InputType } from 'type-graphql';
import { Portfolio } from '../entities';
import {
  Position,
  PositionDirection,
  PositionType,
} from '../entities/position';
import { ObjectIdScalar } from '../object-id.scalar';

@InputType()
export class AddPositionInput implements Partial<Position> {
  @Field(() => ObjectIdScalar)
  symbol_id: ObjectId;

  @Field()
  positionSize: number;

  @Field()
  averagePrice: number;

  @Field({ nullable: true })
  brokerFees?: number;

  @Field(() => PositionType)
  positionType?: PositionType;

  @Field(() => PositionDirection)
  direction?: PositionDirection;

  @Field({ nullable: true })
  openDate?: Date;

  @Field({ nullable: true })
  closeDate?: Date;
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
