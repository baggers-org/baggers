import { prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Quote {
  @Field({ nullable: true })
  @prop()
  avgTotalVolume: number;

  @Field({ nullable: true })
  @prop()
  calculationPrice: string;

  @Field({ nullable: true })
  @prop()
  change: number;

  @Field({ nullable: true })
  @prop()
  changePercent: number;

  @Field({ nullable: true })
  @prop()
  companyName: string;

  @Field({ nullable: true })
  @prop()
  close: number;

  @Field({ nullable: true })
  @prop()
  closeSource: string;

  @Field({ nullable: true })
  @prop()
  closeTime: number;

  @Field({ nullable: true })
  @prop()
  currency: string;

  @Field({ nullable: true })
  @prop()
  delayedPrice: number;

  @Field({ nullable: true })
  @prop()
  delayedPriceTime: number;

  @Field({ nullable: true })
  @prop()
  extendedPrice: number;

  @Field({ nullable: true })
  @prop()
  extendedChange: number;

  @Field({ nullable: true })
  @prop()
  extendedChangePercent: number;

  @Field({ nullable: true })
  @prop()
  extendedPriceTime: number;

  @Field({ nullable: true })
  @prop()
  high: number;

  @Field({ nullable: true })
  @prop()
  highSource: string;

  @Field({ nullable: true })
  @prop()
  highTime: number;

  @Field({ nullable: true })
  @prop()
  iexAskPrice: number;

  @Field({ nullable: true })
  @prop()
  iexAskSize: number;

  @Field({ nullable: true })
  @prop()
  iexBidPrice: number;

  @Field({ nullable: true })
  @prop()
  iexBidSize: number;

  @Field({ nullable: true })
  @prop()
  iexClose: number;

  @Field({ nullable: true })
  @prop()
  iexCloseTime: number;

  @Field({ nullable: true })
  @prop()
  iexLastUpdated: number;

  @Field({ nullable: true })
  @prop()
  iexOpen: number;

  @Field({ nullable: true })
  @prop()
  iexOpenTime: number;

  @Field({ nullable: true })
  @prop()
  iexRealtimePrice: number;

  @Field({ nullable: true })
  @prop()
  iexRealtimeSize: number;

  @Field({ nullable: true })
  @prop()
  iexMarketPercent: number;

  @Field({ nullable: true })
  @prop()
  iexVolume: number;

  @Field({ nullable: true })
  @prop()
  isUSMarketOpen: boolean;

  @Field({ nullable: true })
  @prop()
  lastTradeTime: number;

  @Field({ nullable: true })
  @prop()
  latestPrice: number;

  @Field({ nullable: true })
  @prop()
  latestSource: string;

  @Field({ nullable: true })
  @prop()
  latestTime: string;

  @Field({ nullable: true })
  @prop()
  latestUpdate: number;

  @Field({ nullable: true })
  @prop()
  latestVolume: number;

  @Field({ nullable: true })
  @prop()
  low: number;

  @Field({ nullable: true })
  @prop()
  lowTime: number;

  @Field({ nullable: true })
  @prop()
  lowSource: string;

  @Field({ nullable: true })
  @prop()
  marketCap: number;

  @Field({ nullable: true })
  @prop()
  oddLotDelayedPrice: number;

  @Field({ nullable: true })
  @prop()
  oddLotDelayedPriceTime: number;

  @Field({ nullable: true })
  @prop()
  open: number;

  @Field({ nullable: true })
  @prop()
  openSource: string;

  @Field({ nullable: true })
  @prop()
  openTime: number;

  @Field({ nullable: true })
  @prop()
  peRatio: number;

  @Field({ nullable: true })
  @prop()
  previousClose: number;

  @Field({ nullable: true })
  @prop()
  previousVolume: number;

  @Field({ nullable: true })
  @prop()
  primaryExchange: string;

  @Field({ nullable: true })
  @prop()
  symbol: string;

  @Field({ nullable: true })
  @prop()
  week52High: number;

  @Field({ nullable: true })
  @prop()
  week52Low: number;

  @Field({ nullable: true })
  @prop()
  volume: number;

  @Field({ nullable: true })
  @prop()
  ytdChange: number;
}
