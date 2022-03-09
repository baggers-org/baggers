import { Field, ObjectType } from 'type-graphql';
import { User } from '../entities';
import { BasePayload } from './base-payload';

@ObjectType()
export class FindOrCreateUserPayload extends BasePayload<User> {
  @Field(() => User)
  declare record: User;
}
