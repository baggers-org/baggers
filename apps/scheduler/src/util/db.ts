import { MongoClient } from 'mongodb';
import { Security } from '@baggers/graphql-types';

export const securitesCollection = (client: MongoClient) => {
  return client.db('baggers').collection<Security>('securities');
};
