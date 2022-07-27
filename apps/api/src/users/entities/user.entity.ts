import { Extensions, Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Auth0AccessTokenPayload } from 'src/auth/types';
import { Timestamps } from 'src/shared/classes/timestamps.entity';
import { checkOwnerMiddleware } from 'src/shared/middleware/owner.middleware';

export type UserDocument = User & Document;

@ObjectType()
@Schema()
export class User extends Timestamps {
  @Field()
  @Prop()
  _id: string;

  @Prop()
  displayName: string;

  @Field(() => [String], { middleware: [checkOwnerMiddleware] })
  @Extensions({
    ownerFn: (source: User, user: Auth0AccessTokenPayload) =>
      source._id === user.sub,
  })
  @Prop([String])
  emails?: string[];

  @Prop([String])
  photos: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
