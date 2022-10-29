import { registerEnumType } from '@nestjs/graphql';

export enum Timespan {
  minute = 'minute',
  hour = 'hour',
  day = 'day',
  week = 'week',
  month = 'month',
  quarter = 'quarter',
  year = 'year',
}

registerEnumType(Timespan, { name: 'Timespan' });
