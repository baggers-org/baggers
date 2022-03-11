import { PipelineStage } from 'mongoose';
import { addFieldToPosition } from './addFieldToPosition';

/**
 * @param positionsField Mongo field identifier to an array of Position documents
 */

export const calculatePositionMetrics = (
  positionsField = `$positions`,
): PipelineStage[] => [
  addFieldToPosition(positionsField, {
    marketValue: {
      $multiply: [`$$pos.symbol.quote.latestPrice`, `$$pos.positionSize`],
    },
  }),
  addFieldToPosition(positionsField, {
    profitLossPercent: {
      $divide: [
        {
          $subtract: [`$$pos.marketValue`, `$$pos.costBasis`],
        },
        `$$pos.costBasis`,
      ],
    },
  }),
  addFieldToPosition(positionsField, {
    profitLossUsd: {
      $subtract: [`$$pos.marketValue`, `$$pos.costBasis`],
    },
  }),
  addFieldToPosition(positionsField, {
    dailyProfitLossUsd: {
      $multiply: [`$$pos.positionSize`, `$$pos.symbol.quote.change`],
    },
  }),
];
