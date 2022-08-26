import { Args, Query, Resolver } from '@nestjs/graphql';
import { ObjectId, ObjectIdScalar } from '~/shared';
import { ChartsService } from './charts.service';
import { ChartPriceRangeOptions } from './dto/chart-price-range-options.input';
import { Chart } from './entities/chart.entity';
import { HistorialRange } from './enums/historial-range.enum';

@Resolver(() => Chart)
export class ChartsResolver {
  constructor(private readonly chartsService: ChartsService) {}

  @Query(() => [Chart])
  async chartSecurityPrice(
    @Args('securityId', { type: () => ObjectIdScalar }) securityId: ObjectId,
    @Args('range', { type: () => HistorialRange }) range: HistorialRange,
    @Args('options', { type: () => ChartPriceRangeOptions, nullable: true })
    options?: ChartPriceRangeOptions
  ): Promise<Chart[]> {
    return this.chartsService.chartSecurityPrice(securityId, range, options);
  }
}
