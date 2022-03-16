import { prop } from '@typegoose/typegoose';
import { Authorized, Field, ObjectType } from 'type-graphql';

@ObjectType()
export class PlaidItem {
  @Field({ nullable: true })
  @prop()
  @Authorized(`CRON`)
  access_token?: string;

  @Field({ nullable: true })
  @prop()
  @Authorized(`CRON`)
  item_id?: string;

  @Field({ nullable: true })
  @prop()
  isLinked: boolean;

  @Field({ nullable: true })
  @prop()
  @Authorized(`CRON`)
  linkedAccountId?: string;
}
