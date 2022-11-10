import { Security } from '@baggers/graphql-types';

export type SecuritySnapshot = Pick<
  Security,
  'latestPrice' | 'todaysChange' | 'todaysChangePercent' | '_id'
>;

export type SecurityDetails = Omit<Security, keyof SecuritySnapshot> &
  Pick<Security, '_id'>;
