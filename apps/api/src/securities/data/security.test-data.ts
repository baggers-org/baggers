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
  tickerSnapshot: {
    day: {
      c: 0,
      h: 0,
      l: 0,
      o: 0,
      v: 0,
      vw: 0,
    },
    lastQuote: null,
    lastTrade: null,
    min: {
      av: 12516,
      c: 54.5,
      h: 54.5,
      l: 54.5,
      o: 54.5,
      v: 560,
      vw: 54.5,
    },
    prevDay: {
      c: 55.98,
      h: 58.06,
      l: 55.12,
      o: 56.38,
      v: 3414924,
      vw: 56.0815,
    },
    ticker: 'NET',
    todaysChange: -1.4799999999999969,
    todaysChangePerc: -2.643801357627719,
    updated: 1666959600000000000,
  },
};

export const NET: Security = {
  _id: 'NET',
  currency: 'USD',
  exchange: 'XNYS',
  figi: 'BBG001WMKHH5',
  name: 'Cloudflare Inc - Class A',
  region: 'US',
  assetClass: AssetClass.stock,
  tickerSnapshot: {
    day: {
      c: 0,
      h: 0,
      l: 0,
      o: 0,
      v: 0,
      vw: 0,
    },
    lastQuote: null,
    lastTrade: null,
    min: {
      av: 439699,
      c: 222.83,
      h: 222.83,
      l: 222.82,
      o: 222.82,
      v: 1803,
      vw: 222.8443,
    },
    prevDay: {
      c: 225.09,
      h: 233.81,
      l: 222.85,
      o: 229.77,
      v: 61632874,
      vw: 226.1389,
    },
    ticker: 'TSLA',
    todaysChange: -2.140000000000015,
    todaysChangePerc: -0.9507308187836042,
    updated: 1666960104387139800,
  },
};
export const TSLA: Security = {
  exchange: 'XNAS',
  _id: 'TSLA',
  currency: 'USD',
  figi: 'BBG000N9MNX3',
  name: 'Tesla Inc',
  region: 'US',
  assetClass: AssetClass.stock,
  tickerSnapshot: {
    day: {
      c: 0,
      h: 0,
      l: 0,
      o: 0,
      v: 0,
      vw: 0,
    },
    lastQuote: null,
    lastTrade: null,
    min: {
      av: 2323,
      c: 120,
      h: 3,
      l: 23,
      o: 2,
      v: 2,
      vw: 23,
    },
    prevDay: {
      c: 3.84,
      h: 4.03,
      l: 3.75,
      o: 4.03,
      v: 383336,
      vw: 3.8402,
    },
    ticker: 'ONDS',
    todaysChange: 0,
    todaysChangePerc: 0,
    updated: 0,
  },
};

export const SBSI: Security = {
  exchange: 'XNAS',
  _id: 'SBSI',
  currency: 'USD',
  figi: 'BBG000BGVC19',
  name: 'Southside Bancshares Inc',
  region: 'US',
  assetClass: AssetClass.stock,
  tickerSnapshot: {
    day: {
      c: 0,
      h: 0,
      l: 0,
      o: 0,
      v: 0,
      vw: 0,
    },
    lastQuote: null,
    lastTrade: null,
    min: {
      av: 0,
      c: 0,
      h: 0,
      l: 0,
      o: 0,
      v: 0,
      vw: 0,
    },
    prevDay: {
      c: 33.01,
      h: 33.69,
      l: 32.49,
      o: 32.49,
      v: 155895,
      vw: 33.2222,
    },
    ticker: 'SBSI',
    todaysChange: 0,
    todaysChangePerc: 0,
    updated: 0,
  },
};

export const Securities = [A, NET, TSLA, SBSI];
