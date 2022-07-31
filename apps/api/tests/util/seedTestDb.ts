import { Db } from 'mongodb';
import { Users } from '@baggers/api-users';
import { Tickers } from '@baggers/api-tickers';
import { Portfolios } from '@baggers/api-portfolios';

/* eslint-disable */
export const seedTestDb = async (db: Db) => {
  await db.collection('users').insertMany(Users as any);
  await db.collection('tickers').insertMany(Tickers as any);
  await db.collection('portfolios').insertMany(Portfolios as any);
};
