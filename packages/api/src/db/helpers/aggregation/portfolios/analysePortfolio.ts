import { PipelineStage } from 'mongoose';

export const analysePortfolio: PipelineStage[] = [
  {
    $group: {
      _id: '$holdings._id',
      value: { $max: '$holdings.marketValue' },
      portfolio: { $last: '$$ROOT' },
    },
  },
  {
    $addFields: {
      top5Holdings: {
        $map: {
          input: '$_id',
          as: 'holdingId',
          in: {
            $arrayElemAt: [
              '$portfolio.holdings',
              {
                $indexOfArray: ['$portfolio.holdings._id', '$$holdingId'],
              },
            ],
          },
        },
      },
    },
  },
  {
    $unwind: '$top5Holdings',
  },
  {
    $sort: {
      top5Holdings: -1,
    },
  },
  {
    $group: {
      _id: '$_id',
      portfolio: { $first: '$portfolio' },
      top5Holdings: { $push: '$top5Holdings' },
    },
  },
  {
    $addFields: {
      'portfolio.analysis.top5Holdings': '$top5Holdings',
    },
  },
  {
    $replaceRoot: {
      newRoot: '$portfolio',
    },
  },
  {
    $limit: 5,
  },
];
