import { prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field()
  @prop()
  sub: string;

  @Field()
  @prop()
  username: string;
}
