import { ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

@ObjectType()
export class Quote {
  @Prop()
  avgTotalVolume?: number;

  @Prop()
  calculationPrice?: string;

  @Prop()
  change?: number;

  @Prop()
  changePercent?: number;

  @Prop()
  companyName: string;

  @Prop()
  close?: number;

  @Prop()
  closeSource?: string;

  @Prop()
  closeTime?: number;

  @Prop()
  currency?: string;

  @Prop()
  delayedPrice?: number;

  @Prop()
  delayedPriceTime?: number;

  @Prop()
  extendedPrice?: number;

  @Prop()
  extendedChange?: number;

  @Prop()
  extendedChangePercent?: number;

  @Prop()
  extendedPriceTime?: number;

  @Prop()
  high?: number;

  @Prop()
  highSource?: string;

  @Prop()
  highTime?: number;

  @Prop()
  iexAskPrice?: number;

  @Prop()
  iexAskSize?: number;

  @Prop()
  iexBidPrice?: number;

  @Prop()
  iexBidSize?: number;

  @Prop()
  iexClose?: number;

  @Prop()
  iexCloseTime?: number;

  @Prop()
  iexLastUpdated?: number;

  @Prop()
  iexOpen?: number;

  @Prop()
  iexOpenTime?: number;

  @Prop()
  iexRealtimePrice?: number;

  @Prop()
  iexRealtimeSize?: number;

  @Prop()
  iexMarketPercent?: number;

  @Prop()
  iexVolume?: number;

  @Prop()
  isUSMarketOpen?: boolean;

  @Prop()
  lastTradeTime?: number;

  @Prop()
  latestPrice?: number;

  @Prop()
  latestSource?: string;

  @Prop()
  latestTime?: string;

  @Prop()
  latestUpdate?: number;

  @Prop()
  latestVolume?: number;

  @Prop()
  low?: number;

  @Prop()
  lowTime?: number;

  @Prop()
  lowSource?: string;

  @Prop()
  marketCap?: number;

  @Prop()
  oddLotDelayedPrice?: number;

  @Prop()
  oddLotDelayedPriceTime?: number;

  @Prop()
  open?: number;

  @Prop()
  openSource?: string;

  @Prop()
  openTime?: number;

  @Prop()
  peRatio?: number;

  @Prop()
  previousClose?: number;

  @Prop()
  previousVolume?: number;

  @Prop()
  primaryExchange?: string;

  @Prop()
  symbol?: string;

  @Prop()
  week52High?: number;

  @Prop()
  week52Low?: number;

  @Prop()
  volume?: number;

  @Prop()
  ytdChange?: number;
}
