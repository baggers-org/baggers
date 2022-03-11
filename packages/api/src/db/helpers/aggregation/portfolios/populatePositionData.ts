import { PipelineStage } from 'mongoose';

export const populatePositionData = (
  positionsField = `$positions`,
): PipelineStage[] => [
  {
    $lookup: {
      from: `symbols`,
      localField: `positions.symbol`,
      foreignField: `_id`,
      as: `marketData`,
    },
  },
  {
    $addFields: {
      positions: {
        $reduce: {
          input: positionsField,
          initialValue: [],
          in: {
            $concatArrays: [
              `$$value`,
              [
                {
                  $mergeObjects: [
                    `$$this`,
                    {
                      symbol: {
                        $arrayElemAt: [
                          `$marketData`,
                          {
                            $indexOfArray: [`$marketData._id`, `$$this.symbol`],
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
    $unset: `marketData`,
  },
];
