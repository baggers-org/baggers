import { AssetClass, TickerType } from '@baggers/graphql-types';
import {
  MarketDataMapper,
  SecurityDetails,
  SecuritySnapshot,
} from '@baggers/market-data-adapter';
import { SnapshotInfo } from '@polygon.io/client-js/lib/rest/stocks/snapshots';
import type {
  PolygonTicker,
  PolygonTickerSnapshot,
} from './polygon-types';

export class PolygonMapper extends MarketDataMapper<
  PolygonTicker,
  PolygonTickerSnapshot
> {
  mapTickerType(source?: string): TickerType {
    // Our TickerType interface is a 1:1 with Polygon ticker type
    // no need to map in this case
    return source as TickerType;
  }

  mapAssetClass(source?: string): AssetClass {
    switch (source) {
      default: {
        return AssetClass.Stock;
      }
    }
  }

  mapSecurityDetails(source: PolygonTicker): SecurityDetails {
    if (!source.ticker) throw Error('Security has no ticker');

    return {
      _id: source.ticker,
      figi: source.composite_figi,
      name: source.name,
      assetClass: this.mapAssetClass(source.type),
      isImported: false,

      // TODO: we are only using currency_name now, but the /ref/v3/tickers
      // endpoint seems to return currency_symbol, ie. some fields are missing
      // on the new tickerdetails endpoint
      currency: source.currency_name,
      exchange: source.primary_exchange,
      tickerDetails: {
        active: source.active,
        cik: source.cik?.toString(),
        currencyName: source.currency_name,
        description: source.description,
        homepageUrl: source.homepage_url,
        iconUrl: source.branding?.icon_url,
        logoUrl: source.branding?.logo_url,
        listDate: source.list_date,
        market: source.market,
        marketCap: source.market_cap,
        name: source.name,
        sicCode: source.sic_code,
        type: this.mapTickerType(source.type),
        sicDescription: source.sic_description,
        totalEmployees: source.total_employees,
        weightedSharesOutstanding: source.weighted_shares_outstanding,
      },
    };
  }

  mapSecuritySnapshot(source: SnapshotInfo): SecuritySnapshot {
    if (!source.ticker) throw Error('Security has no ticker');
    return {
      _id: source.ticker,
      latestPrice: source.lastTrade?.p,
      todaysChange: source.todaysChange,
      todaysChangePercent: source.todaysChangePerc,
    };
  }
}
