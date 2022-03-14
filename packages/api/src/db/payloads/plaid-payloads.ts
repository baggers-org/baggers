import { LinkTokenCreateResponse } from 'plaid';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class PlaidCreateLinkTokenResponse implements LinkTokenCreateResponse {
  @Field()
  link_token: string;
  @Field()
  request_id: string;
  @Field()
  expiration: string;
}
