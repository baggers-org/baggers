import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import { getTickerSnapshots } from '../../cron-ticker-snapshots/src/get-ticker-snapshots';
import { mockPolygonStocksClientMethod } from './util';
import { AssetClass, Security } from '@baggers/graphql-types';

jest.mock('@baggers/env', () => ({ setupEnv: () => ({}) }));

describe('getTickerSnapshots', () => {
  let mongod: MongoMemoryServer;
  let mockMongoClient: MongoClient;
  beforeEach(async () => {
    mongod = await MongoMemoryServer.create({
      instance: {
        port: 8888,
      },
    });
    mockMongoClient = new MongoClient(mongod.getUri());
  });

  it('given a new VALID snapshot it should set the last price to 100 and lastTrade.p to 100', async () => {
    // Enter our first snapshot
    mockMongoClient
      .db('baggers')
      .collection<Security>('securities')
      .insertOne({
        _id: 'TSLA',
        latestPrice: 95,
        assetClass: AssetClass.Stock,
      });

    // Return a valid snapshot, ie. price is greater than 0
    mockPolygonStocksClientMethod({
      async snapshotAllTickers() {
        return {
          tickers: [
            {
              ticker: 'TSLA',
              lastTrade: {
                p: 100,
              },
            },
          ],
        };
      },
    });

    // This should update the latestPrice and tickerSnapshot accordingly
    await getTickerSnapshots(mockMongoClient);

    expect(
      await mockMongoClient
        .db('baggers')
        .collection('securities')
        .find()
        .toArray()
    ).toMatchInlineSnapshot(`
      [
        {
          "_id": "TSLA",
          "assetClass": "stock",
          "latestPrice": 100,
          "todaysChange": null,
          "todaysChangePercent": null,
        },
      ]
    `);
  });

  it('given an empty snapshot it should re-use our previously saved latestPrice as 666', async () => {
    mockMongoClient
      .db('baggers')
      .collection<Security>('securities')
      .insertOne({
        _id: 'ONDS',
        // WE got 666 from the last valid snapshot update in this case
        latestPrice: 666,
        assetClass: AssetClass.Stock,
      });

    mockPolygonStocksClientMethod({
      async snapshotAllTickers() {
        return {
          tickers: [
            {
              ticker: 'ONDS',
              lastTrade: {
                // Simulate an empty snapshot, this will happen on weekends or really early in the morning
                // after polygon has wiped them (3.30am EST)
                p: 0,
              },
            },
          ],
        };
      },
    });
    await getTickerSnapshots(mockMongoClient);

    await new Promise((resolve) =>
      setTimeout(() => resolve(true), 2000)
    );

    // Or snapshots should not change
    expect(
      await mockMongoClient
        .db('baggers')
        .collection('securities')
        .findOne({ _id: 'ONDS' })
    ).toMatchInlineSnapshot(`
      {
        "_id": "ONDS",
        "assetClass": "stock",
        "latestPrice": 666,
      }
    `);
  });

  afterEach(async () => {
    console.log('Cleaning up mongo process');
    await mockMongoClient.close();
    await mongod.stop({ doCleanup: true });
    console.log('Finished');
  });
});
