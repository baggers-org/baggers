import { prop } from '@typegoose/typegoose';
import { Authorized, Field, InputType, ObjectType } from 'type-graphql';

abstract class PlaidImportError extends Error {}

@ObjectType()
export class MissingSymbol {
  @Field()
  @prop()
  name?: string;
  @Field()
  @prop()
  figi?: string;
  @Field()
  @prop()
  exchange?: string;
  @Field()
  @prop()
  symbol?: string;
}
@ObjectType()
export class PlaidMissingSecuritiesError extends PlaidImportError {
  @Field()
  @prop()
  message: string;
  @Field(() => [MissingSymbol], { nullable: true })
  @prop({ type: [MissingSymbol] })
  missingSymbols?: MissingSymbol[];
  constructor(msg: string, missingSymbols?: MissingSymbol[]) {
    super(msg);
    this.message = msg;
    this.missingSymbols = missingSymbols;
  }
}

@InputType()
export class PlaidInput {
  @Field({ nullable: true })
  missingSecuritiesError?: boolean;
}
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

  @Field(() => PlaidMissingSecuritiesError, { nullable: true })
  @prop({ type: PlaidMissingSecuritiesError })
  missingSecuritiesError?: PlaidMissingSecuritiesError;
}
