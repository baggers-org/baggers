import { registerEnumType } from '@nestjs/graphql';

export enum TickerType {
  CS = 'CS',
  PFD = 'PFD',
  WARRANT = 'WARRANT',
  RIGHT = 'RIGHT',
  BOND = 'BOND',
  ETF = 'ETF',
  ETN = 'ETN',
  ETV = 'ETV',
  SP = 'SP',
  ADRC = 'ADRC',
  ADRW = 'ADRW',
  ADRR = 'ADRR',
  FUND = 'FUND',
  BASKET = 'BASKET',
  UNIT = 'UNIT',
  LT = 'LT',
  OS = 'OS',
  GDR = 'GDR',
  OTHER = 'OTHER',
  NYRS = 'NYRS',
  AGEN = 'AGEN',
  EQLK = 'EQLK',
}

registerEnumType(TickerType, { name: 'TickerType' });
