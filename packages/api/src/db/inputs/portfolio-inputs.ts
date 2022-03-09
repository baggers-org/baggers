import { ObjectId } from 'mongodb';
import { Field, InputType } from 'type-graphql';
import { Position } from '../entities/position';
import { ObjectIdScalar } from '../object-id.scalar';

interface IAddPositionInput extends Partial<Position> {
  symbol_id: ObjectId;
  portfolio_id: ObjectId;
}

@InputType()
export class AddPositionInput implements IAddPositionInput {
  @Field(() => ObjectIdScalar)
  symbol_id: ObjectId;

  @Field(() => ObjectIdScalar)
  portfolio_id: ObjectId;

  @Field()
  positionSize: number;

  @Field()
  costBasis: number;

  @Field({ nullable: true })
  brokerFees?: number;

  @Field()
  isShort?: boolean;

  @Field({ nullable: true })
  openDate?: Date;

  @Field({ nullable: true })
  closeDate?: Date;
}
