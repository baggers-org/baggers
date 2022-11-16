import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { TickerType } from '../enums/ticker-type.enum';

@ObjectType()
export class TickerDetails {
  @Prop()
  active?: boolean;
  @Prop()
  iconUrl?: string;
  @Prop()
  logoUrl?: string;
  @Prop()
  cik?: string;
  @Prop()
  currencyName?: string;
  @Prop()
  description?: string;
  @Prop()
  homepageUrl?: string;
  @Prop()
  listDate?: string;
  @Prop()
  market?: string;
  @Prop()
  marketCap?: number;
  @Prop()
  name?: string;
  @Prop()
  phoneNumber?: string;
  @Prop()
  shareClassOutstanding?: number;
  @Prop()
  sicCode?: number;
  @Prop()
  sicDescription?: string;
  @Prop()
  totalEmployees?: number;
  @Field(() => TickerType)
  @Prop({ enum: TickerType, type: String })
  type?: TickerType;
  @Prop()
  weightedSharesOutstanding?: number;
}
