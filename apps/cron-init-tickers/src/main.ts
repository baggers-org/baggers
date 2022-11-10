import { mongoClient } from '@baggers/mongo-client';
import { initTickers } from './init-tickers';

initTickers(mongoClient());
