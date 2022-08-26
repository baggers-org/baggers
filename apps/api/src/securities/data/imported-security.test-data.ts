import { ImportedSecurity } from '../entities';
import { SecurityType } from '../enums/security-type.enum';

// This will be in our Databse
export const ImportedSBSI: ImportedSecurity = {
  close_price: 34.73,
  close_price_as_of: null,
  cusip: '84470P109',
  institution_id: null,
  institution_security_id: null,
  is_cash_equivalent: false,
  isin: 'US84470P1093',
  currency: 'USD',
  name: 'Southside Bancshares Inc.',
  proxy_security_id: null,
  security_id: 'eW4jmnjd6AtjxXVrjmj6SX1dNEdZp3Cy8RnRQ',
  sedol: null,
  ticker_symbol: 'SBSI',
  type: SecurityType.equity,
  unofficial_currency_code: null,
  update_datetime: null,
};

// This will not
export const ImportedDBLTX: ImportedSecurity = {
  close_price: 10.42,
  close_price_as_of: null,
  cusip: '258620103',
  institution_id: null,
  institution_security_id: null,
  is_cash_equivalent: false,
  isin: 'US2586201038',
  currency: 'USD',
  name: 'DoubleLine Total Return Bond Fund',
  proxy_security_id: null,
  security_id: 'NDVQrXQoqzt5v3bAe8qRt4A7mK7wvZCLEBBJk',
  sedol: null,
  ticker_symbol: 'DBLTX',
  type: SecurityType.mutual_fund,
  unofficial_currency_code: null,
  update_datetime: null,
};
