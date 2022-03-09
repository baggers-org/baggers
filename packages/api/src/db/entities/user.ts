import { getModelForClass, index, prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';
import { Document } from './document';

@ObjectType()
@index({ sub: 1 })
export class User extends Document {
  @Field()
  @prop()
  sub: string;

  @Field()
  @prop()
  displayName: string;

  @Field(() => [String])
  @prop({ type: () => [String] })
  emails: [string];

  @Field(() => [String])
  @prop({ type: () => [String] })
  photos: [string];
}

export const UserModel = getModelForClass(User);
