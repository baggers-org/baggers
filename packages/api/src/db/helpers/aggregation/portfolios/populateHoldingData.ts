import { PipelineStage } from 'mongoose';
import { calculateHoldingMetrics } from './calculateHoldingMetrics';

export const populateHoldingData = (
  holdingsField = '$holdings',
): PipelineStage[] => [
  {
    $lookup: {
      from: 'symbols',
      localField: 'holdings.symbol',
      foreignField: '_id',
      as: 'marketData',
    },
  },
  {
    $addFields: {
      holdings: {
        $reduce: {
          input: holdingsField,
          initialValue: [],
          in: {
            $concatArrays: [
              '$$value',
              [
                {
                  $mergeObjects: [
                    '$$this',
                    {
                      symbol: {
                        $arrayElemAt: [
                          '$marketData',
                          {
                            $indexOfArray: ['$marketData._id', '$$this.symbol'],
                          },
                        ],
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      },
    },
  },
  {
    $unset: 'marketData',
  },

  ...calculateHoldingMetrics(),
];
