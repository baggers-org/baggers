import { MongoClient } from 'mongodb';
import { env } from './env';
import { getTickerInfo } from './get-ticker-info';

const client = new MongoClient(env.ATLAS_CLUSTER_URI);

getTickerInfo(client);
