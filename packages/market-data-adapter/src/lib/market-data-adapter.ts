import {
  LastTrade,
  SecurityDetails,
  SecuritySnapshot,
} from './types';

export abstract class MarketDataAdapter<TMapper> {
  mapper: TMapper;

  constructor(mapper: TMapper) {
    this.mapper = mapper;
  }
  /**
   * This method should return all the securities offered by the market data
   * provider.
   */
  abstract getAllTickers(): Promise<string[]>;

  /**
   * Given a ticker this method will return the full security object
   *
   */
  abstract getSecurityDetails(
    ticker: string
  ): Promise<SecurityDetails>;

  abstract batchGetSecurityDetails(
    tickers: string[]
  ): Promise<SecurityDetails[]>;
  /**
   * This method should return the latest price snapshots for all securities
   * that the market data hsa to offer
   */
  abstract getAllSecuritySnapshots(): Promise<SecuritySnapshot[]>;

  abstract getLastTrade(ticker: string): Promise<LastTrade>;
}
