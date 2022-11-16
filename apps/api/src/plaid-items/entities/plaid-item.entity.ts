import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { checkAdminMiddleware } from '~/auth';
import { PlaidItemError } from './plaid-item-error.entity';
import { Institution } from '~/institutions';
import { User } from '~/users';

export type PlaidItemDocument = PlaidItem & Document;
/**
 * An item represents a login at a financial inst.
 * They will only be accessible by `admin` user's
 * and the primary use for storing will be to
 *
 */
@Schema()
@ObjectType()
export class PlaidItem {
  @Prop()
  _id: string;

  @Field(() => User)
  @Prop({ ref: 'User', type: () => String })
  owner: User | string;

  @Prop()
  @Field(() => String, { middleware: [checkAdminMiddleware] })
  accessToken: string;

  @Field(() => Institution)
  @Prop({ type: () => String, ref: Institution.name })
  institution: Institution | string;

  @Field(() => PlaidItemError)
  @Prop()
  error?: PlaidItemError;

  @Field(() => Date)
  @Prop({ default: new Date('1970/01/01') })
  lastWebhookTime: Date;
}

export const PlaidItemSchema =
  SchemaFactory.createForClass(PlaidItem);
