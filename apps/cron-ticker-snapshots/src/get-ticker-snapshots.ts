import { restClient } from '@polygon.io/client-js';
import { Security } from '@baggers/graphql-types';
import { AnyBulkWriteOperation, MongoClient } from 'mongodb';

export const getTickerSnapshots = async (mongoClient: MongoClient) => {
  const polygon = restClient(env.POLYGON_API_KEY);
  const { count, tickers, status } = await polygon.stocks.snapshotAllTickers();

  console.log('Polygon API ticker snapshot status ', status);
  console.log('Fetched ', count, ' ticker snapshots from polygon');

  console.log('Updating our DB with these snapshots');

  const securities = mongoClient
    .db('baggers')
    .collection<Security>('securities');

  const operations: AnyBulkWriteOperation<Security>[] = tickers
    .filter((t) => !!t?.lastTrade?.p)
    .map((t) => ({
      updateOne: {
        filter: { _id: t.ticker },
        update: [
          {
            $set: {
              latestPrice: t?.lastTrade?.p,
              todaysChange: t?.todaysChange,
              todaysChangePercent: t?.todaysChangePerc,
            },
          },
        ],
      },
    }));
  if (!operations.length) {
    console.log('No valid snapshots to write');

    return;
  }

  console.log('Writing ', operations.length, ' valid snapshots to the DB.');

  const writeResult = await securities.bulkWrite(operations, {
    ordered: false,
  });

  console.log('Finished writing');

  console.log(writeResult);

  // insert tickerSnapshot object for every security and also make sure we have
};
