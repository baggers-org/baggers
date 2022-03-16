import { InputType, Field } from 'type-graphql';

@InputType()
export class PlaidImportPortfoliosInput {
  @Field()
  public_token: string;
}
