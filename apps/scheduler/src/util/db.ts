import { MongoClient } from 'mongodb';
import { Security } from '@baggers/graphql-types';
import { env } from './env';

const client = new MongoClient(env.MONGO_URI);
export const securitesCollection = () => {
  return client.db('baggers').collection<Security>('securities');
};
