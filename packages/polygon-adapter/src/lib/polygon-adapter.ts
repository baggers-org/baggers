import { IRestClient } from '@polygon.io/client-js';
import { defaultPolygonRestClient } from './polygon-client';
import { RateLimiter } from 'limiter';
import {
  LastTrade,
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

  private polygonLimitter = new RateLimiter({
    tokensPerInterval: 99,
    interval: 'sec',
  });

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

  async getLastTrade(ticker: string): Promise<LastTrade> {
    // TODO: implement trade mapper

    const { results, ...rest } = await this.client.stocks.lastTrade(
      ticker
    );

    if (!results || !results.p || !results.s) {
      console.error(rest);
      throw Error('Error fetching last trade');
    }

    return {
      _id: ticker,
      p: results.p,
      s: results.s,
    };
  }

  async batchGetLastTrade(tickers: string[]): Promise<LastTrade[]> {
    let fetched = 0;
    return Promise.all(
      tickers.map(async (t) => {
        await this.polygonLimitter.removeTokens(1);
        const details = await this.getLastTrade(t);
        fetched += 1;
        console.log('Fetched ', fetched, ' / ', tickers.length);
        return details;
      })
    );
  }

  async getAllSecuritySnapshots(): Promise<SecuritySnapshot[]> {
    const { tickers, status } =
      await this.client.stocks.snapshotAllTickers();

    if (!tickers) {
      console.error('Polygon status: ' + status);
      throw Error('Error fetching ticker snapshot');
    }
    return tickers.map((t) => this.mapper.mapSecuritySnapshot(t));
  }

  async getSecurityDetails(ticker: string): Promise<SecurityDetails> {
    try {
      const { results, status } =
        await this.client.reference.tickerDetails(ticker);

      if (!results) {
        console.error('Polygon status: ' + status);
        throw Error('Error fetching ticker snapshot');
      }
      return this.mapper.mapSecurityDetails(results);
    } catch (e) {
      console.error('Could not find ticker ' + ticker);
      console.error(e);
      throw e;
    }
  }

  async batchGetSecurityDetails(
    tickers: string[]
  ): Promise<SecurityDetails[]> {
    let fetched = 0;
    return Promise.all(
      tickers.map(async (t) => {
        await this.polygonLimitter.removeTokens(1);
        const details = await this.getSecurityDetails(t);
        fetched += 1;
        console.log('Fetched ', fetched, ' / ', tickers.length);
        return details;
      })
    );
  }
}
