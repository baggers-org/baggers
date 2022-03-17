import { prop } from '@typegoose/typegoose';
import { Field, ObjectType, registerEnumType } from 'type-graphql';

// Don't move these outside of this file - its annoying but type-graphl breaks
export enum TransactionSubtype {
  AccountFee = `account fee`,
  Adjustment = `adjustment`,
  Assignment = `assignment`,
  Buy = `buy`,
  BuyToCover = `buy to cover`,
  Contribution = `contribution`,
  Deposit = `deposit`,
  Distribution = `distribution`,
  Dividend = `dividend`,
  DividendReinvestment = `dividend reinvestment`,
  Exercise = `exercise`,
  Expire = `expire`,
  FundFee = `fund fee`,
  Interest = `interest`,
  InterestReceivable = `interest receivable`,
  InterestReinvestment = `interest reinvestment`,
  LegalFee = `legal fee`,
  LoanPayment = `loan payment`,
  LongTermCapitalGain = `long-term capital gain`,
  LongTermCapitalGainReinvestment = `long-term capital gain reinvestment`,
  ManagementFee = `management fee`,
  MarginExpense = `margin expense`,
  Merger = `merger`,
  MiscellaneousFee = `miscellaneous fee`,
  NonQualifiedDividend = `non-qualified dividend`,
  NonResidentTax = `non-resident tax`,
  PendingCredit = `pending credit`,
  PendingDebit = `pending debit`,
  QualifiedDividend = `qualified dividend`,
  Rebalance = `rebalance`,
  ReturnOfPrincipal = `return of principal`,
  Sell = `sell`,
  SellShort = `sell short`,
  ShortTermCapitalGain = `short-term capital gain`,
  ShortTermCapitalGainReinvestment = `short-term capital gain reinvestment`,
  SpinOff = `spin off`,
  Split = `split`,
  StockDistribution = `stock distribution`,
  Tax = `tax`,
  TaxWithheld = `tax withheld`,
  Transfer = `transfer`,
  TransferFee = `transfer fee`,
  TrustFee = `trust fee`,
  UnqualifiedGain = `unqualified gain`,
  Withdrawal = `withdrawal`,
}
export enum TransactionType {
  Buy = `buy`,
  Sell = `sell`,
  Cancel = `cancel`,
  Cash = `cash`,
  Fee = `fee`,
  Transfer = `transfer`,
}

registerEnumType(TransactionType, {
  name: `TransactionType`,
});
registerEnumType(TransactionSubtype, {
  name: `TransactionSubtype`,
});

@ObjectType()
export class Transaction {
  @Field()
  @prop()
  name: string;

  @Field()
  @prop()
  date: Date;

  @Field()
  @prop()
  currency: string;

  @Field()
  @prop()
  quantity: number;

  @Field()
  @prop()
  price: number;

  @Field(() => TransactionType)
  @prop({ enum: TransactionType })
  type: TransactionType;

  @Field(() => TransactionSubtype)
  @prop({ enum: TransactionSubtype })
  subType: TransactionSubtype;
}
