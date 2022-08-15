import { registerEnumType } from '@nestjs/graphql';
import { InvestmentTransactionSubtype } from 'plaid';

registerEnumType(InvestmentTransactionSubtype, {
  name: 'TransactionSubtype',
});
