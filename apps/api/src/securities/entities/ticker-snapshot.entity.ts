/**
 * NOTE: This entity is not used at the moment -
 * it maps directly to the ITickerSnapshot interface from
 * the polygon rest API.
 *
 * However on 9/11/22 I decided to de-couple our entities from
 * the market data provider, and instead use adapters
 * to map the provider into the format we want.
 *
 * This will make it easy to switch out market data provider in future
 * or even add new ones.
 *
 * Leaving this entity in here incase I do need to extract some info again
 */
import { ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

@ObjectType()
export class SnapshotDay {
  @Prop()
  c?: number;
  @Prop()
  h?: number;
  @Prop()
  l?: number;
  @Prop()
  o?: number;
  @Prop()
  v?: number;
  @Prop()
  vw?: number;
}

@ObjectType()
export class SnapshotLastQuote {
  @Prop()
  P?: number;
  @Prop()
  S?: number;
  @Prop()
  p?: number;
  @Prop()
  s?: number;
  @Prop()
  t?: number;
}

@ObjectType()
export class SnapshotLastTrade {
  @Prop()
  c?: string[];
  @Prop()
  i?: string;
  @Prop()
  p?: number;
  @Prop()
  s?: number;
  @Prop()
  t?: number;
  @Prop()
  x?: number;
}

@ObjectType()
export class SnapshotMin {
  @Prop()
  av?: number;
  @Prop()
  c?: number;
  @Prop()
  h?: number;
  @Prop()
  l?: number;
  @Prop()
  o?: number;
  @Prop()
  v?: number;
  @Prop()
  vw?: number;
}

@ObjectType()
export class SnapshotPrevDay {
  @Prop()
  c?: number;
  @Prop()
  h?: number;
  @Prop()
  l?: number;
  @Prop()
  o?: number;
  @Prop()
  v?: number;
  @Prop()
  vw?: number;
}
@ObjectType()
export class TickerSnapshot {
  @Prop()
  day?: SnapshotDay;
  @Prop()
  lastQuote?: SnapshotLastQuote;
  @Prop()
  lastTrade?: SnapshotLastTrade;
  @Prop()
  min?: SnapshotMin;
  @Prop()
  prevDay?: SnapshotPrevDay;
  @Prop()
  ticker?: string;
  @Prop()
  todaysChange?: number;
  @Prop()
  todaysChangePerc?: number;
  @Prop()
  updated?: number;
}
