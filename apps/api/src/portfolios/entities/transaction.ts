import { ImportedSecurity, Security } from '~/securities';
import { ObjectId, ObjectIdScalar } from '~/shared';
import { User } from '~/users';
import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import {
  InvestmentTransactionSubtype,
  InvestmentTransactionType,
} from 'plaid';
import { AssetClass } from '~/securities/enums/asset-class.enum';

@ObjectType('TransactionFromDb')
export class Transaction {
  @Prop({ required: true })
  @Field(() => ObjectIdScalar)
  _id: ObjectId;

  @Prop()
  @Field()
  name: string;

  @Prop({ default: () => new Date(), type: () => Date })
  @Field(() => Date)
  date: Date;

  @Prop()
  @Field()
  currency: string;

  @Prop()
  @Field()
  amount: number;

  @Prop({ default: 0 })
  @Field()
  fees: number;

  @Prop()
  @Field()
  quantity: number;

  @Prop()
  @Field({ nullable: true })
  price?: number;

  @Field(() => InvestmentTransactionType)
  @Prop({ enum: InvestmentTransactionType, type: String })
  type: InvestmentTransactionType;

  @Field(() => InvestmentTransactionSubtype)
  @Prop({ enum: InvestmentTransactionSubtype, type: String })
  subType: InvestmentTransactionSubtype;

  @Field(() => Security, { nullable: true })
  @Prop({ type: String, ref: 'Security' })
  security?: string | Security;

  @Field(() => ImportedSecurity, { nullable: true })
  @Prop(() => ImportedSecurity)
  importedSecurity?: ImportedSecurity;

  @Field(() => AssetClass)
  @Prop({ enum: AssetClass, type: String })
  assetClass: AssetClass;

  @Field({
    description: 'This is the transaction_id from plaid',
    nullable: true,
  })
  @Prop()
  plaidTransactionId?: string;

  @Field({
    description: 'This is the account_id from plaid',
    nullable: true,
  })
  @Prop()
  plaidAccountId?: string;

  @Field(() => User, { nullable: true })
  @Prop({ type: String, ref: 'User' })
  createdBy?: string;
}
@ObjectType('Transaction')
export class PopulatedTransaction extends OmitType(Transaction, [
  'security',
]) {
  @Field(() => Security, { nullable: true })
  security?: Security;
}
