import { MongoClient } from 'mongodb';
import { getTickerInfo } from './tickers/get-ticker-info';
import { getTickerSnapshots } from './tickers/get-ticker-snapshots';
import { env } from './util/env';

const client = new MongoClient(env.MONGO_URI);

if (process.argv[2] === 'get-ticker-info') {
  console.log('Running get-ticker-info');
  (async () => {
    getTickerInfo(client);
  })();
}

if (process.argv[2] === 'get-ticker-snapshots') {
  console.log('Running get-ticker-snapshots');
  (async () => {
    await getTickerSnapshots(client);
  })();
}
