import { TSLA, A, ImportedDBLTX, ImportedSBSI, SBSI } from '~/securities';
import { AssetClass } from '~/securities/enums/asset-class.enum';
import { ObjectId } from '~/shared';
import { Holding } from '../entities';
import { HoldingSource, HoldingDirection } from '../enums';

const TestCashHolding: Holding = {
  _id: new ObjectId('62d2cd45c63873e235c99531'),
  quantity: 1239.32,
  source: HoldingSource.direct,
  assetClass: AssetClass.cash,
  currency: 'USD',
};
export const Holdings1: Holding[] = [
  // Market value 1239.32
  TestCashHolding,
  // Market value = 7403.70
  {
    _id: new ObjectId('62d2cd45c63873e235c99532'),
    security: TSLA._id,
    averagePrice: 383.9,
    costBasis: 3839,
    currency: 'USD',
    brokerFees: 0,
    direction: HoldingDirection.long,
    quantity: 10,
    assetClass: AssetClass.stock,
    source: HoldingSource.broker,
  },

  // Market value = 1230.9
  {
    _id: new ObjectId('62d2cd45c63873e235c99533'),
    security: A._id,
    averagePrice: 4794.2,
    costBasis: 47942,
    currency: 'USD',
    brokerFees: 0,
    direction: HoldingDirection.long,
    quantity: 10,
    assetClass: AssetClass.stock,
    source: HoldingSource.broker,
  },
];

export const ImportedHoldings: Holding[] = [
  TestCashHolding,
  {
    _id: new ObjectId('62d2cd45c63873e235c99567'),
    averagePrice: 10,
    costBasis: 100,
    quantity: 10,
    institutionValue: 432,
    source: HoldingSource.broker,
    assetClass: AssetClass.stock,
    currency: 'USD',
    importedSecurity: ImportedDBLTX,
  },
  {
    _id: new ObjectId('62d2cd45c63873e235c99569'),
    averagePrice: 409,
    costBasis: 49,
    quantity: 50,
    institutionValue: 52300,
    source: HoldingSource.broker,
    // This one can be linked
    security: SBSI._id,
    assetClass: AssetClass.stock,
    currency: 'USD',
    importedSecurity: ImportedSBSI,
  },
  // And some matched holdings, just for testing purposes as it should support both
  {
    _id: new ObjectId('62d2cd45c63873e235c99570'),
    averagePrice: 1000,
    costBasis: 42,
    quantity: 20,
    source: HoldingSource.broker,
    assetClass: AssetClass.stock,
    currency: 'USD',
    security: TSLA._id,
  },
];
