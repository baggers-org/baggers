import { ImportedSecurity, Security } from '@baggers/api-securities';
import { ObjectId } from '@baggers/api-shared';
import { User } from '@baggers/api-users';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { InvestmentTransactionSubtype, InvestmentTransactionType } from 'plaid';

@ObjectType()
export class Transaction {
  @Prop()
  @Field()
  name: string;

  @Prop(() => Date)
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
  fees?: number;

  @Prop()
  @Field()
  quantity?: number;

  @Prop()
  @Field()
  price?: number;

  @Field(() => InvestmentTransactionType)
  @Prop({ enum: InvestmentTransactionType, type: String })
  type: InvestmentTransactionType;

  @Field(() => InvestmentTransactionSubtype)
  @Prop({ enum: InvestmentTransactionSubtype, type: String })
  subType: InvestmentTransactionSubtype;

  @Field(() => Security, { nullable: true })
  @Prop({ type: ObjectId, ref: 'Security' })
  baggersSecurity?: Security | ObjectId;

  @Field(() => ImportedSecurity)
  @Prop(() => ImportedSecurity)
  importedSecurity?: ImportedSecurity;

  @Field({ description: 'This is the transaction_id from plaid' })
  @Prop()
  plaidTransactionId?: string;

  @Field(() => User, { nullable: true })
  @Prop({ type: ObjectId, ref: 'User' })
  createdBy?: User;
}
