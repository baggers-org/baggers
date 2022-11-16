import { Security } from '@baggers/graphql-types';

export type SecuritySnapshot = Pick<
  Security,
  'latestPrice' | 'todaysChange' | 'todaysChangePercent' | '_id'
>;

export type SecurityDetails = Omit<Security, keyof SecuritySnapshot> &
  Pick<Security, '_id'>;

// We aren't currently storing trade data
// This is just used to fetch prices for "Orphan" tickers
// TODO: when we need to display trade data to users
// move this into our graphql
export type LastTrade = {
  _id: string;
  p: number;
  s: number;
};
