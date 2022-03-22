import { prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';

abstract class PlaidImportError extends Error {}

@ObjectType()
export class MissingSymbol {
  @Field({ nullable: true })
  @prop()
  name?: string;
  @Field({ nullable: true })
  @prop()
  figi?: string;
  @Field({ nullable: true })
  @prop()
  exchange?: string;
  @Field()
  @prop()
  symbol: string;
}

@ObjectType()
export class PlaidInstitution {
  @Field()
  @prop()
  name: string;

  @Field({ nullable: true })
  @prop()
  logo?: string;

  @Field({ nullable: true })
  @prop()
  url?: string;
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
  @prop()
  access_token?: string;

  @prop()
  item_id?: string;

  @prop()
  request_id?: string;

  @Field({ nullable: true })
  @prop()
  isLinked: boolean;

  @Field({ nullable: true })
  @prop()
  linkedAccountId?: string;

  @Field(() => PlaidMissingSecuritiesError, { nullable: true })
  @prop({ type: PlaidMissingSecuritiesError })
  missingSecuritiesError?: PlaidMissingSecuritiesError;

  @Field(() => PlaidInstitution, { nullable: true })
  @prop({ type: PlaidInstitution })
  institution: PlaidInstitution;
}
