import { Field, InputType } from '@nestjs/graphql';
import { AscDesc } from '../enums/asc-desc.enum';

@InputType()
export class ChartPriceRangeOptions {
  includeToday?: boolean;
  chartCloseOnly?: boolean;
  chartByDay?: boolean;
  chartSimplify?: boolean;
  chartInterval?: number;
  chartLast?: number;
  displayPercent?: number;
  @Field(() => AscDesc)
  sort?: AscDesc;
}
