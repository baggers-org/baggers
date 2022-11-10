import { MongoClient } from 'mongodb';
import { env } from '../../../libs/polygon-adapter/src/lib/env';
import { getTickerSnapshots } from './get-ticker-snapshots';

const client = new MongoClient(env.ATLAS_CLUSTER_URI);

getTickerSnapshots(client);
