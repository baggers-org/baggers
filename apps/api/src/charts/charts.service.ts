import { Injectable } from '@nestjs/common';
import { filter, map, Observable } from 'rxjs';
import { MarketDataSocketService } from '~/market-data-socket/market-data-socket.service';
import { PolygonService } from '~/polygon/polygon.service';
import { ChartPriceRangeOptions } from './dto/chart-price-range-options.input';
import { Aggregate } from './entities/aggregate.entity';

// TODO: change to MarketDataAdapter and use
// DI to inject PolygonAdapter globallt
@Injectable()
export class ChartsService {
  constructor(
    private polygon: PolygonService,
    private marketDataSocket: MarketDataSocketService
  ) {}
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

    if (!results) throw Error('Error fetching chart');

    return results;
  }

  chartRealtime(ticker: string): Observable<Aggregate> {
    return this.marketDataSocket
      .subscribeToAggregateData([ticker])
      .pipe(
        map((arr) => arr.pop()),
        filter((val): val is Aggregate => !!val)
      );
  }
}
