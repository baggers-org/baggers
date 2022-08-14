import { PipelineStage } from 'mongoose';

/**
 * Populated the security field in every holding in each of the portfolio documents
 * input
 */
export const populateHoldingTickers: PipelineStage[] = [
  {
    $unwind: {
      path: '$holdings',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: 'securities',
      localField: 'holdings.security',
      foreignField: '_id',
      as: 'holdings.security',
    },
  },
  {
    $unwind: {
      path: '$holdings.security',
      preserveNullAndEmptyArrays: true,
    },
  },

  {
    $addFields: {
      marketValue: {
        $multiply: [
          '$holdings.quantity',
          '$holdings.security.quote.latestPrice',
        ],
      },
    },
  },
  {
    $sort: {
      marketValue: -1,
    },
  },
  {
    $group: {
      _id: '$_id',
      portfolio: {
        $first: '$$ROOT',
      },
      holdings: {
        $push: {
          $cond: [{ $eq: ['$holdings', {}] }, '$noval', '$holdings'],
        },
      },
    },
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: [
          '$portfolio',
          {
            holdings: '$holdings',
          },
        ],
      },
    },
  },
];
