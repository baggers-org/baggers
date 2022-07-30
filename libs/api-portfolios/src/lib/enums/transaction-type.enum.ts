import { registerEnumType } from '@nestjs/graphql';

export enum TransactionType {
  Buy = `buy`,
  Sell = `sell`,
  Cancel = `cancel`,
  Cash = `cash`,
  Fee = `fee`,
  Transfer = `transfer`,
}

registerEnumType(TransactionType, {
  name: 'TransactionType',
});
