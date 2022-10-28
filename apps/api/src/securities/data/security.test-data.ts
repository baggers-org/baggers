import { Security } from '../entities';
import { AssetClass } from '../enums/asset-class.enum';

export const A: Security = {
  _id: 'A',
  currency: 'USD',
  exchange: 'XNAS',
  figi: 'BBG000C2V3D6',
  name: 'Agilent Technologies Inc.',
  region: 'US',
  assetClass: AssetClass.stock,
};

export const NET: Security = {
  _id: 'NET',
  currency: 'USD',
  exchange: 'XNYS',
  figi: 'BBG001WMKHH5',
  name: 'Cloudflare Inc - Class A',
  region: 'US',
  assetClass: AssetClass.stock,
};
export const TSLA: Security = {
  exchange: 'XNAS',
  _id: 'TSLA',
  currency: 'USD',
  figi: 'BBG000N9MNX3',
  name: 'Tesla Inc',
  region: 'US',
  assetClass: AssetClass.stock,
};

export const SBSI: Security = {
  exchange: 'XNAS',
  _id: 'SBSI',
  currency: 'USD',
  figi: 'BBG000BGVC19',
  name: 'Southside Bancshares Inc',
  region: 'US',
  assetClass: AssetClass.stock,
};

export const Securities = [A, NET, TSLA, SBSI];
