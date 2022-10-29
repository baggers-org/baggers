import { Args, Query, Resolver } from '@nestjs/graphql';
import { ChartsService } from './charts.service';
import { ChartPriceRangeOptions } from './dto/chart-price-range-options.input';
import { Aggregate } from './entities/aggregate.entity';

@Resolver(() => Aggregate)
export class ChartsResolver {
  constructor(private readonly chartsService: ChartsService) {}

  @Query(() => [Aggregate])
  async chartSecurityPrice(
    @Args('ticker') ticker: string,
    @Args('options') options: ChartPriceRangeOptions
  ): Promise<Aggregate[]> {
    return this.chartsService.chartSecurityPrice(ticker, options);
  }
}
