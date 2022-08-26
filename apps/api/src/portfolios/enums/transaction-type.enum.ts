import { registerEnumType } from '@nestjs/graphql';
import { InvestmentTransactionType } from 'plaid';

registerEnumType(InvestmentTransactionType, {
  name: 'TransactionType',
});
