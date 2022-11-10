import { mongoClient } from '@baggers/mongo-client';
import { initTickers } from './init-tickers';

initTickers(mongoClient()).catch((e) => {
  console.error(e);
  process.exit(1);
});
