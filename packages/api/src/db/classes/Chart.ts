import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Chart {
  @Field()
  id: string;
  @Field()
  key: string;
  @Field()
  subkey: string;
  @Field()
  date: string;
  @Field()
  updated: number;
  @Field()
  close: number;
  @Field()
  high: number;
  @Field()
  low: number;
  @Field()
  open: number;
  @Field()
  symbol: string;
  @Field()
  volume: number;
  @Field()
  changeOverTime: number;
  @Field()
  marketChangeOverTime: number;
  @Field()
  uOpen: number;
  @Field()
  uClose: number;
  @Field()
  uHigh: number;
  @Field()
  uLow: number;
  @Field()
  uVolume: number;
  @Field()
  fOpen: number;
  @Field()
  fClose: number;
  @Field()
  fHigh: number;
  @Field()
  fLow: number;
  @Field()
  fVolume: number;
  @Field()
  label: string;
  @Field()
  change: number;
  @Field()
  changePercent: number;
}
