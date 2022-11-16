import { MongoClient } from 'mongodb';
import { Security } from '@baggers/graphql-types';
import { env } from './env';

export const mongoClient = () =>
  new MongoClient(env.ATLAS_CLUSTER_URI);

export const securitiesCollection = (client: MongoClient) =>
  client.db('baggers').collection<Security>('securities');
