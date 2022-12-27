import { registerEnumType } from '@nestjs/graphql';

export enum TickerType {
  Cs = 'CS',
  Pfd = 'PFD',
  Warrant = 'WARRANT',
  Right = 'RIGHT',
  Bond = 'BOND',
  Etf = 'ETF',
  Etn = 'ETN',
  Ets = 'ETS',
  Etv = 'ETV',
  Sp = 'SP',
  Adrc = 'ADRC',
  Adrw = 'ADRW',
  Adrr = 'ADRR',
  Fund = 'FUND',
  Basket = 'BASKET',
  Unit = 'UNIT',
  Lt = 'LT',
  Os = 'OS',
  Gdr = 'GDR',
  Other = 'OTHER',
  Nyrs = 'NYRS',
  Agen = 'AGEN',
  Eqlk = 'EQLK',
}

registerEnumType(TickerType, { name: 'TickerType' });
