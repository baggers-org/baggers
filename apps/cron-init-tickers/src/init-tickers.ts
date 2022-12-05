import { Security } from '@baggers/graphql-types';
import { securitiesCollection } from '@baggers/mongo-client';
import { MarketData } from '@baggers/market-data';
import { AnyBulkWriteOperation, MongoClient } from 'mongodb';

export const initTickers = async (mongo: MongoClient) => {
  const tickers = await MarketData.getAllTickers();

  console.log('Enriching securities with ticker details');

  const securities = await MarketData.batchGetSecurityDetails(
    tickers
  );

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
    nNewTickers: res.nUpserted,
    nUpdated: res.nModified,
    writeErrors: res.result.writeErrors,
  });

  process.exit(0);
};
