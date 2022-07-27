import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import { seedTestDb } from './seedTestDb';

export const TEST_DB_NAME = 'test-db';
export const createTestDb = async (): Promise<MongoMemoryServer> => {
  const mongod = await MongoMemoryServer.create();
  const testUri = mongod.getUri();

  const client = new MongoClient(testUri);

  await client.connect();

  await seedTestDb(client.db(TEST_DB_NAME));

  return mongod;
};
