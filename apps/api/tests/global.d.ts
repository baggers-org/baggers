import { MongoMemoryServer } from 'mongodb-memory-server';

export interface global {}
declare global {
  var __MONGOD__: MongoMemoryServer;
}
