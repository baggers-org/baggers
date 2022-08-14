import { BaseDocument } from '@baggers/api-shared';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { User } from './user.entity';

@ObjectType()
export class OwnedDocument extends BaseDocument {
  @Field(() => User)
  @Prop({ ref: 'User', type: () => String })
  owner: User | string;
}
