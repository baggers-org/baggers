import { Field, ObjectType } from 'type-graphql';
import { Portfolio } from '../entities';
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
  @Field(() => Portfolio)
  declare record: Portfolio;
}

@ObjectType()
export class UpdatePortfolioPayload extends BasePayload<Portfolio> {
  @Field(() => Portfolio)
  declare record: Portfolio;
}
