import { Db } from 'mongodb';
import { Users } from '~/users';
import { Securities } from '~/securities';
import { Portfolios } from '~/portfolios';

/* eslint-disable */
export const seedTestDb = async (db: Db) => {
  await db.collection('users').insertMany(Users as any);
  await db.collection('securities').insertMany(Securities as any);
  await db.collection('portfolios').insertMany(Portfolios as any);
};
