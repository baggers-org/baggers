import { IRestClient, ITickerDetails } from '@polygon.io/client-js';
import http from 'http';
import { defaultPolygonRestClient } from './polygon-client';
import {
  LastTrade,
  MarketDataAdapter,
  SecurityDetails,
  SecuritySnapshot,
} from '@baggers/market-data-adapter';
import { PolygonMapper } from './polygon-mapper';
import { paginatedFetch } from './paginated-fetch';
import { batchRequest } from '@baggers/batch-request';
import axios from 'axios';
import { env } from './env';

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

  async getLastTrade(ticker: string): Promise<LastTrade> {
    // TODO: implement trade mapper

    const { results } = await this.client.stocks.lastTrade(ticker);

    return {
      _id: ticker,
      p: results.p,
      s: results.s,
    };
  }

  async batchGetLastTrade(
    tickers: string[],
    batchSize = 1000
  ): Promise<LastTrade[]> {
    const batchedFunctions = tickers.map(
      (t) => () => this.getLastTrade(t)
    );
    return batchRequest(batchedFunctions, batchSize);
  }

  async getAllSecuritySnapshots(): Promise<SecuritySnapshot[]> {
    const { tickers } = await this.client.stocks.snapshotAllTickers();

    return tickers.map((t) => this.mapper.mapSecuritySnapshot(t));
  }

  async getSecurityDetails(ticker: string): Promise<SecurityDetails> {
    try {
      const { data } = await axios.get<ITickerDetails>(
        `/v3/reference/tickers/${ticker}`,
        {
          baseURL: 'https://api.polygon.io',
          params: {
            apiKey: env.POLYGON_API_KEY,
          },
          httpAgent: new http.Agent({ keepAlive: true }),
        }
      );

      return this.mapper.mapSecurityDetails(data.results);
    } catch (e) {
      console.error('Could not find ticker ' + ticker);
      console.error(e);
      throw e;
    }
  }

  async batchGetSecurityDetails(
    tickers: string[],
    batchSize = 1000
  ): Promise<SecurityDetails[]> {
    const batchedFunctions = tickers.map(
      (t) => () => this.getSecurityDetails(t)
    );
    return batchRequest(batchedFunctions, batchSize);
  }
}
