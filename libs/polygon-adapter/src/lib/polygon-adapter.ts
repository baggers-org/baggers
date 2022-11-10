import { IRestClient } from '@polygon.io/client-js';
import { defaultPolygonRestClient } from './polygon-client';
import {
  MarketDataAdapter,
  SecurityDetails,
  SecuritySnapshot,
} from '@baggers/market-data-adapter';
import { PolygonMapper } from './polygon-mapper';
import { paginatedFetch } from './paginated-fetch';

export class PolygonAdapter extends MarketDataAdapter<
  IRestClient,
  PolygonMapper
> {
  constructor(client: IRestClient = defaultPolygonRestClient()) {
    super(client, new PolygonMapper());
  }

  async getAllTickers(): Promise<string[]> {
    console.log('Fetching all tickers from polygon');

    const results = await paginatedFetch(
      () =>
        this.client.reference.tickers({
          limit: 1000,
          market: 'stocks',
        }),
      { limit: 1000 }
    );
    console.log('Fetched ', results.length);
    console.log('Finished fetching tickers');

    return results.map((t) => t.ticker);
  }

  getAllSecuritySnapshots(): Promise<SecuritySnapshot[]> {
    throw new Error('Method not implemented.');
  }

  async getSecurityDetails(ticker: string): Promise<SecurityDetails> {
    try {
      const { results } = await this.client.reference.tickerDetails(
        ticker
      );
      return this.mapper.mapSecurity(results);
    } catch (e) {
      console.error('Could not find ticker ' + ticker);
      console.error(e);
      throw e;
    }
  }

  async batchGetSecurityDetails(
    tickers: string[],
    batchSize = 4000
  ): Promise<SecurityDetails[]> {
    let remaining = tickers.length;
    let results: SecurityDetails[] = [];

    while (remaining > 0) {
      const batchStart = tickers.length - remaining;
      const batchEnd = batchStart + Math.min(batchSize, remaining);
      const batch = tickers.slice(batchStart, batchEnd);
      let errors = 0;
      console.log(batch.length);

      console.log('Fetching batch of ', batch.length, '...');
      const t = Date.now();

      results = [
        ...results,
        ...(await Promise.all(
          batch.map(async (t) => {
            return this.getSecurityDetails(t)
              .then((results) => {
                remaining -= 1;
                return results;
              })
              .catch(() => {
                errors += 1;
                return null;
              });
          })
        )),
      ].filter((r) => !!r);

      console.log('Fetch finished');
      console.table({
        batchTime: (Date.now() - t) / 1000,
        errors,
      });
      console.log(
        'Total fetched ',
        tickers.length - remaining,
        ' / ',
        tickers.length
      );
    }

    return results;
  }
}
