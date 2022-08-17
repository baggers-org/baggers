import { registerEnumType } from '@nestjs/graphql';

export enum ImportedSecurityType {
  cash = 'cash',
  'cryptocurrency' = 'cryptocurrency',
  'derivative' = 'derivative',
  'equity' = 'equity',
  'etf' = 'etf',
  fixed_income = 'fixed income',
  'loan' = 'loan',
  mutual_fund = 'mutual fund',
  'other' = 'other',
}

registerEnumType(ImportedSecurityType, { name: 'ImportedSecurityType' });
