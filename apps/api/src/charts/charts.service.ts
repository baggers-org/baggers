import { Injectable } from '@nestjs/common';
import { PolygonService } from '@api/polygon/polygon.service';
import { ChartPriceRangeOptions } from './dto/chart-price-range-options.input';
import { Aggregate } from './entities/aggregate.entity';

@Injectable()
export class ChartsService {
  constructor(private polygon: PolygonService) {}
  async chartSecurityPrice(
    ticker: string,
    options: ChartPriceRangeOptions
  ): Promise<Aggregate[]> {
    const { results } = await this.polygon.client.stocks.aggregates(
      ticker,
      1,
      options.timespan,
      options.from,
      options.to
    );

    return results;
  }
}
