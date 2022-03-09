import { prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Quote {
  @Field()
  @prop()
  avgTotalVolume: number;

  @Field()
  @prop()
  calculationPrice: string;

  @Field()
  @prop()
  change: number;

  @Field()
  @prop()
  changePercent: number;

  @Field()
  @prop()
  companyName: string;

  @Field()
  @prop()
  close: number;

  @Field()
  @prop()
  closeSource: string;

  @Field()
  @prop()
  closeTime: number;

  @Field()
  @prop()
  currency: string;

  @Field()
  @prop()
  delayedPrice: number;

  @Field()
  @prop()
  delayedPriceTime: number;

  @Field()
  @prop()
  extendedPrice: number;

  @Field()
  @prop()
  extendedChange: number;

  @Field()
  @prop()
  extendedChangePercent: number;

  @Field()
  @prop()
  extendedPriceTime: number;

  @Field()
  @prop()
  high: number;

  @Field()
  @prop()
  highSource: string;

  @Field()
  @prop()
  highTime: number;

  @Field()
  @prop()
  iexAskPrice: number;

  @Field()
  @prop()
  iexAskSize: number;

  @Field()
  @prop()
  iexBidPrice: number;

  @Field()
  @prop()
  iexBidSize: number;

  @Field()
  @prop()
  iexClose: number;

  @Field()
  @prop()
  iexCloseTime: number;

  @Field()
  @prop()
  iexLastUpdated: number;

  @Field()
  @prop()
  iexOpen: number;

  @Field()
  @prop()
  iexOpenTime: number;

  @Field()
  @prop()
  iexRealtimePrice: number;

  @Field()
  @prop()
  iexRealtimeSize: number;

  @Field()
  @prop()
  iexMarketPercent: number;

  @Field()
  @prop()
  iexVolume: number;

  @Field()
  @prop()
  isUSMarketOpen: boolean;

  @Field()
  @prop()
  lastTradeTime: number;

  @Field()
  @prop()
  latestPrice: number;

  @Field()
  @prop()
  latestSource: string;

  @Field()
  @prop()
  latestTime: string;

  @Field()
  @prop()
  latestUpdate: number;

  @Field()
  @prop()
  latestVolume: number;

  @Field()
  @prop()
  low: number;

  @Field()
  @prop()
  lowTime: number;

  @Field()
  @prop()
  lowSource: string;

  @Field()
  @prop()
  marketCap: number;

  @Field()
  @prop()
  oddLotDelayedPrice: number;

  @Field()
  @prop()
  oddLotDelayedPriceTime: number;

  @Field()
  @prop()
  open: number;

  @Field()
  @prop()
  openSource: string;

  @Field()
  @prop()
  openTime: number;

  @Field()
  @prop()
  peRatio: number;

  @Field()
  @prop()
  previousClose: number;

  @Field()
  @prop()
  previousVolume: number;

  @Field()
  @prop()
  primaryExchange: string;

  @Field()
  @prop()
  symbol: string;

  @Field()
  @prop()
  week52High: number;

  @Field()
  @prop()
  week52Low: number;

  @Field()
  @prop()
  volume: number;

  @Field()
  @prop()
  ytdChange: number;
}
