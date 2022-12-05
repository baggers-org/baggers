import { Args, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ChartsService } from './charts.service';
import { ChartPriceRangeOptions } from './dto/chart-price-range-options.input';
import { Aggregate } from './entities/aggregate.entity';
import { observableToAsyncIterable } from '~/market-data-socket/observableToAsyncITerable';
import { map } from 'rxjs';

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

  @Subscription(() => Aggregate)
  chartRealtime(@Args('ticker') ticker: string) {
    return observableToAsyncIterable(
      this.chartsService
        .chartRealtime(ticker)
        .pipe(map((a) => ({ chartRealtime: a })))
    );
  }
}
