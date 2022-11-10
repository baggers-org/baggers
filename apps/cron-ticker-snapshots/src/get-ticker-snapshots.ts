import { Security } from '@baggers/graphql-types';
import { PolygonAdapter } from '@baggers/polygon-adapter';

import { securitiesCollection } from '@baggers/mongo-client';
import { AnyBulkWriteOperation, MongoClient } from 'mongodb';

export const getTickerSnapshots = async (
  mongoClient: MongoClient
) => {
  const t = Date.now();
  console.log('Beginning get ticker snapshots');

  const polygon = new PolygonAdapter();
  const snapshots = await polygon.getAllSecuritySnapshots();

  const operations: AnyBulkWriteOperation<Security>[] = snapshots
    // Make sure we have a latest price and not 0
    .filter((t) => !!t?.latestPrice)
    .map((snapshot) => ({
      updateOne: {
        filter: { _id: snapshot._id },
        update: [
          {
            $set: snapshot,
          },
        ],
      },
    }));

  if (!operations.length) {
    console.log('No valid snapshots to write');

    return;
  }

  console.log(
    'Writing ',
    operations.length,
    ' valid snapshots to the DB.'
  );

  const securities = securitiesCollection(mongoClient);
  const writeResult = await securities.bulkWrite(operations, {
    ordered: false,
  });

  console.log('Finished writing');

  console.log(writeResult);
  console.log('Finding orphan securities');

  const orphans = await securities
    .find({
      latestPrice: null,
    })
    .toArray();

  console.log(
    'Found ',
    orphans.length,
    ' orphan tickers with no price data'
  );

  console.log('Populating orphans using Last trade endpoint');

  const lastTrades = await polygon.batchGetLastTrade(
    orphans.map((o) => o._id)
  );

  if (lastTrades.length) {
    console.log(
      'Received ',
      lastTrades.length,
      ' trades from polygon'
    );

    console.log('Using this data to update the orphans latestPrice');

    const orphanRes = await securities.bulkWrite(
      lastTrades.map((t) => ({
        updateOne: {
          filter: {
            _id: t._id,
          },
          update: {
            $set: {
              latestPrice: t.p,
            },
          },
        },
      }))
    );

    console.log(orphanRes);
  }

  console.log('FINISHED');
  console.log('-----------------------------------');

  console.table({
    totalTimeForJob: (Date.now() - t) / 1000,
  });

  process.exit(0);
  // insert tickerSnapshot object for every security and also make sure we have
};
