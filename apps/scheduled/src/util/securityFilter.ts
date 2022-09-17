import { Portfolio, Security } from '@baggers/sdk';
import { baggersDb } from './mongo';

export const getAllSecurities = async (): Promise<Security[]> => {
  const coll = baggersDb().collection<Security>('securities');
  const allSecurities = await coll.find().toArray();
  console.log('Found ', allSecurities.length, ' securities.');
  return allSecurities;
};

export const getAllOwnedSecurites = async (): Promise<Security[]> => {
  const coll = baggersDb().collection<Portfolio>('portfolios');

  const result = await coll
    .aggregate<Security>([
      {
        $unwind: '$holdings',
      },
      {
        $replaceRoot: {
          newRoot: '$holdings',
        },
      },
      {
        $group: {
          _id: '$security',
          security: {
            $first: '$$ROOT',
          },
        },
      },
      {
        $lookup: {
          from: 'securities',
          localField: 'security.security',
          foreignField: '_id',
          as: 'security',
        },
      },
      {
        $unwind: '$security',
      },
      {
        $replaceRoot: {
          newRoot: '$security',
        },
      },
    ])
    .toArray();

  console.log('Found ', result.length, ' owned securities.');
  return result;
};
