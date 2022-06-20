import { Field, InputType } from 'type-graphql';

@InputType()
export class ChartPriceRangeOptions {
  [index: string]: any;

  @Field()
  includeToday?: boolean;
  @Field()
  chartCloseOnly?: boolean;
  @Field()
  chartByDay?: boolean;
  @Field()
  chartSimplify?: boolean;
  @Field()
  chartInterval?: number;
  @Field()
  chartLast?: number;
  @Field()
  displayPercent?: number;
  @Field()
  sort?: 'desc' | 'asc';
}
