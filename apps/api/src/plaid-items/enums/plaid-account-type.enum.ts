import { registerEnumType } from '@nestjs/graphql';
export enum PlaidAccountType {
  investment = 'investment',
  credit = 'credit',
  depository = 'depository',
  loan = 'loan',
  brokerage = 'brokerage',
  other = 'other',
}
registerEnumType(PlaidAccountType, { name: 'PlaidAccountType' });
