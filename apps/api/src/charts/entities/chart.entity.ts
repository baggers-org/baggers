import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Chart {
  id: string;
  key: string;
  subkey: string;
  date: string;
  updated: number;
  close: number;
  high: number;
  low: number;
  open: number;
  symbol: string;
  volume: number;
  changeOverTime: number;
  marketChangeOverTime: number;
  uOpen: number;
  uClose: number;
  uHigh: number;
  uLow: number;
  uVolume: number;
  fOpen: number;
  fClose: number;
  fHigh: number;
  fLow: number;
  fVolume: number;
  label: string;
  change: number;
  changePercent: number;
}
