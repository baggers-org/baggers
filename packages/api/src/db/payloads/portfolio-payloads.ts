import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { Portfolio } from '../entities';
import { ObjectIdScalar } from '../object-id.scalar';
import { BasePayload } from './base-payload';

@ObjectType()
export class CreatePortfolioPayload extends BasePayload<Portfolio> {
  @Field(() => Portfolio)
  declare record: Portfolio;
}

@ObjectType()
export class AddPositionPayload extends BasePayload<Portfolio> {
  @Field(() => Portfolio)
  declare record: Portfolio;
}

@ObjectType()
export class RemovePositionPayload extends BasePayload<Portfolio> {
  @Field(() => ObjectIdScalar)
  declare recordId: string | ObjectId;
}

@ObjectType()
export class UpdatePortfolioPayload extends BasePayload<Portfolio> {
  @Field(() => Portfolio)
  declare record: Portfolio;
}
