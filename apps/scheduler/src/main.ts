import { MongoClient } from 'mongodb';
import { getTickerSnapshots } from './tickers/get-ticker-snapshots';
import { env } from './util/env';

const client = new MongoClient(env.MONGO_URI);
const run = async () => {
  await getTickerSnapshots(client);
  // await getTickerInfo();
};

run();
