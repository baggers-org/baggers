import { Db } from 'mongodb';
// Do not use tsconfig path aliases in here
import { Users } from '../../src/users';
import { Securities } from '../../src/securities';
import { Portfolios } from '../../src/portfolios';

/* eslint-disable */
export const seedTestDb = async (db: Db) => {
  await db.collection('users').insertMany(Users as any);
  await db.collection('securities').insertMany(Securities as any);
  await db.collection('portfolios').insertMany(Portfolios as any);
};
