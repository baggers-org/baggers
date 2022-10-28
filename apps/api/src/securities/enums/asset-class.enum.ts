import { registerEnumType } from '@nestjs/graphql';

export enum AssetClass {
  cash = 'cash',
  'cryptocurrency' = 'cryptocurrency',
  'derivative' = 'derivative',
  'fx' = 'fx',
  'stock' = 'stock',
}

registerEnumType(AssetClass, { name: 'AssetClass' });
