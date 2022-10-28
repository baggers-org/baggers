import { restClient } from '@polygon.io/client-js';
import { securitesCollection } from './util/db';
import { env } from './util/env';

export const getTickerSnapshots = async () => {
  const polygon = restClient(env.POLYGON_API_KEY);
  const { count, tickers, status } = await polygon.stocks.snapshotAllTickers();

  console.log('Polygon API ticker snapshot status ', status);
  console.log('Fetched ', count, ' ticker snapshots from polygon');

  console.log('Updating our DB with these snapshots');

  const securities = securitesCollection();

  const operations = tickers.map((t) => ({
    updateOne: {
      filter: { _id: t.ticker },
      update: {
        $set: {
          _id: t.ticker,
          tickerSnapshot: t,
        },
      },
      upsert: true,
    },
  }));
  console.log(operations.length, ' bulk write ops');

  const writeResult = await securities.bulkWrite(operations);

  console.log('Finished writing');

  console.log(writeResult);

  // insert tickerSnapshot object for every security and also make sure we have
};
