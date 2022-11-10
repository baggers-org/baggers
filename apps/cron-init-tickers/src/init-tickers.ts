import { Security } from '@baggers/graphql-types';
import { securitiesCollection } from '@baggers/mongo-client';
import { PolygonAdapter } from '@baggers/polygon-adapter';
import { AnyBulkWriteOperation, MongoClient } from 'mongodb';

export const initTickers = async (mongo: MongoClient) => {
  console.log('Beginning init tickers');

  const polygon = new PolygonAdapter();
  const tickers = await polygon.getAllTickers();

  console.log('Enriching securities with ticker details');

  const securities = await polygon.batchGetSecurityDetails(tickers);

  console.log('Ready to update ', securities.length, ' securities');

  console.log('Building bulk operations for mongodb');

  const operations: AnyBulkWriteOperation<Security>[] =
    securities.map((t) => ({
      updateOne: {
        filter: {
          _id: t._id,
        },
        update: {
          $set: {
            _id: t._id,
            figi: t.figi,
            name: t.name,
            exchange: t.exchange,
            region: t.region,
            currency: t.currency,
            assetClass: t.assetClass,
            tickerDetails: t.tickerDetails,
          },
        },
        upsert: true,
      },
    }));

  console.log('Created ', operations.length, ' operations');

  console.log('Attempting to upsert ', operations.length, ' tickers');

  const res = await securitiesCollection(mongo).bulkWrite(
    operations,
    {
      ordered: false,
    }
  );
  console.log('RESULTS');

  console.log('---------------------------');

  console.table({
    ...res.result,
    ...res.result.opTime,
  });

  return process.exit(0);
};
