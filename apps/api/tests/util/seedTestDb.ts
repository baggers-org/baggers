import { Db } from 'mongodb';
import { Users } from '@api/users';
import { Securities } from '@api/securities';
import { Portfolios } from '@api/portfolios';

/* eslint-disable */
export const seedTestDb = async (db: Db) => {
  await db.collection('users').insertMany(Users as any);
  await db.collection('securities').insertMany(Securities as any);
  await db.collection('portfolios').insertMany(Portfolios as any);
};
