import { Db } from 'mongodb';
import { Portfolios } from 'tests/data/portfolio.test-data';
import { Tickers } from 'tests/data/ticker.test-data';
import { Users } from 'tests/data/user.test-data';

export const seedTestDb = async (db: Db) => {
  await db.collection('users').insertMany(Users as any);
  await db.collection('tickers').insertMany(Tickers as any);
  await db.collection('portfolios').insertMany(Portfolios as any);
};
