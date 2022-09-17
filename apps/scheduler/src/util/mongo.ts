import { MongoClient } from 'mongodb';
import invariant from 'tiny-invariant';

invariant(process.env.ATLAS_CLUSTER_URI, 'ATLAS_CLUSTER_URI not set');

const client = new MongoClient(process.env.ATLAS_CLUSTER_URI);

export const baggersDb = () => {
  const db = client.db('baggers');
  return db;
};
