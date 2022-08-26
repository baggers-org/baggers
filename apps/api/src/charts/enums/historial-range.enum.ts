import { registerEnumType } from '@nestjs/graphql';

export enum HistorialRange {
  max = 'max',
  Last5Years = '5y',
  Last2Years = '2y',
  LastYear = '1y',
  YearToDate = 'ytd',
  Last6Months = '6m',
  Last3Months = '3m',
  LastMonth = '1m',
  LastMonth30MinuteIntervals = '1mm',
  Last5Days = '5d',
  Last5Days10MinuteIntervals = '5dm',
  'date' = 'date',
  'dynamic' = 'dynamic',
}

registerEnumType(HistorialRange, { name: 'HistoricalRange' });
