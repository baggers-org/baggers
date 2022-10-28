import { registerEnumType } from '@nestjs/graphql';

export enum AssetClass {
  Cash = 'Cash',
  'Cryptocurrency' = 'Cryptocurrency',
  'Derivative' = 'Derivative',
  'Fx' = 'Fx',
  'Stock' = 'Stock',
}

registerEnumType(AssetClass, { name: 'AssetClass' });
