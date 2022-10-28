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
