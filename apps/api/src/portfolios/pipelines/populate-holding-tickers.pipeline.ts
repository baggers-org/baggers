import { PipelineStage } from 'mongoose';

/**
 * Populated the ticker field in every holding in each of the portfolio documents
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
      from: 'tickers',
      localField: 'holdings.ticker',
      foreignField: '_id',
      as: 'holdings.ticker',
    },
  },
  {
    $unwind: {
      path: '$holdings.ticker',
      preserveNullAndEmptyArrays: true,
    },
  },

  {
    $addFields: {
      marketValue: {
        $multiply: ['$holdings.quantity', '$holdings.ticker.quote.latestPrice'],
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
