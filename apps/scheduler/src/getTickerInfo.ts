import { AssetClass, Security, TickerType } from '@baggers/graphql-types';
import { ITickerDetails, restClient } from '@polygon.io/client-js';
import { AnyBulkWriteOperation } from 'mongodb';
import { securitesCollection } from './util/db';
import { env } from './util/env';

export const getTickerInfo = async () => {
  const polygon = restClient(env.POLYGON_API_KEY);

  const securities = await securitesCollection().find().toArray();

  let fetched = 0;
  const missingTickers = [];

  const results: (ITickerDetails['results'] | void)[] = await Promise.all(
    securities.map(({ _id }) => {
      return polygon.reference
        .tickerDetails(_id)
        .then((res) => {
          fetched += 1;
          console.log('Fetched ', fetched, '/', securities.length);
          if (!res.results) {
            throw { status: 'NOT_FOUND' };
          }

          return res.results;
        })
        .catch((err) => {
          if (err.status === 'NOT_FOUND') {
            console.error('Polygon could not find ticker ', _id);
            missingTickers.push(_id);
          }
          return null;
        });
    })
  );

  console.log(
    'Fetched a total of ',
    results.length,
    ' tickers, out of ',
    securities.length,
    ' total.'
  );
  console.log('Missed a total of ', missingTickers.length, ' tickers.');
  console.log('Missing tickers: ', JSON.stringify(missingTickers));

  console.log('Updating securities collection with tickerDetails');

  const operations: AnyBulkWriteOperation<Security>[] = (
    results.filter((r) => !!r) as ITickerDetails['results'][]
  ).map((ticker) => ({
    updateOne: {
      filter: { _id: ticker.ticker },
      update: {
        $set: {
          figi: ticker.composite_figi,
          name: ticker.name,
          assetClass: AssetClass.Stock,
          exchange: ticker.primary_exchange,
          region: ticker.locale,
          tickerDetails: {
            active: ticker.active,
            cik: ticker.cik?.toString(),
            currencyName: ticker.currency_name,
            description: ticker.description,
            homepageUrl: ticker.homepage_url,
            iconUrl: ticker.branding?.icon_url,
            logoUrl: ticker.branding?.logo_url,
            listDate: ticker.list_date,
            market: ticker.market,
            marketCap: ticker.market_cap,
            name: ticker.name,
            sicCode: ticker.sic_code,
            sicDescription: ticker.sic_description,
            totalEmployees: ticker.total_employees,
            type: ticker.type as TickerType,
            weightedSharesOutstanding: ticker.weighted_shares_outstanding,
          },
        },
      },
    },
  }));
  console.log(operations.length, ' bulk write ops');

  const writeResult = await securitesCollection().bulkWrite(operations);

  console.log(writeResult);
};
