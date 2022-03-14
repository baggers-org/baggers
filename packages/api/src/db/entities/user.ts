import { Owner } from '@/middleware/Owner';
import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ObjectType, UseMiddleware } from 'type-graphql';

@ObjectType()
export class User {
  @Field()
  @prop()
  _id: string;

  @Field()
  @prop()
  displayName: string;

  @Field(() => [String], { nullable: true })
  @prop({ type: () => [String] })
  @UseMiddleware(Owner(({ context, root }) => root._id === context.user.sub))
  emails: [string];

  @Field(() => [String])
  @prop({ type: () => [String] })
  photos: [string];
}

export const UserModel = getModelForClass(User);
