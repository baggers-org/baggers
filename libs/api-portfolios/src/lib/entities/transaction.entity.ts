import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { TransactionSubtype } from '../enums/transaction-subtype.enum';
import { TransactionType } from '../enums/transaction-type.enum';

@ObjectType()
export class Transaction {
  @Prop()
  name: string;

  @Prop()
  date: Date;

  @Prop()
  currency: string;

  @Prop()
  quantity: number;

  @Prop()
  price: number;

  @Field(() => TransactionType)
  @Prop({ enum: TransactionType, type: String })
  type: TransactionType;

  @Field(() => TransactionSubtype)
  @Prop({ enum: TransactionSubtype, type: String })
  subType: TransactionSubtype;
}
