import { PipelineStage } from 'mongoose';

export const sortHoldingsByMarketValue: PipelineStage[] = [
  {
    $unwind: {
      path: '$holdings',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $sort: {
      'holdings.marketValue': -1,
    },
  },
  {
    $group: {
      _id: '$_id',
      root: {
        $first: '$$ROOT',
      },
      sortedHoldings: {
        $push: '$holdings',
      },
    },
  },
  {
    $addFields: {
      root: {
        $mergeObjects: [
          '$root',
          {
            holdings: '$sortedHoldings',
          },
        ],
      },
    },
  },
  {
    $replaceRoot: {
      newRoot: '$root',
    },
  },
];
