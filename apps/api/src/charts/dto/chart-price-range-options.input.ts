import { Field, InputType } from '@nestjs/graphql';
import { AscDesc } from '../enums/asc-desc.enum';
import { Timespan } from '../enums/timespan.enum';

@InputType()
export class ChartPriceRangeOptions {
  from: string;

  to: string;

  @Field(() => Timespan)
  timespan: Timespan;

  @Field(() => AscDesc)
  sort?: AscDesc;
}
