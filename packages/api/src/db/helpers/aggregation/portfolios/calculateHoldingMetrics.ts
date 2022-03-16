import { PipelineStage } from 'mongoose';
import { addFieldToHolding } from './addFieldToHolding';

/**
 * @param holdingsField Mongo field identifier to an array of Holding documents
 */

export const calculateHoldingMetrics = (
  holdingsField = `$holdings`,
): PipelineStage[] => [
  addFieldToHolding(holdingsField, {
    marketValue: {
      $multiply: [`$$pos.symbol.quote.latestPrice`, `$$pos.holdingSize`],
    },
  }),
  addFieldToHolding(holdingsField, {
    profitLossPercent: {
      $divide: [
        {
          $subtract: [`$$pos.marketValue`, `$$pos.costBasis`],
        },
        `$$pos.costBasis`,
      ],
    },
  }),
  addFieldToHolding(holdingsField, {
    profitLossUsd: {
      $subtract: [`$$pos.marketValue`, `$$pos.costBasis`],
    },
  }),
  addFieldToHolding(holdingsField, {
    dailyProfitLossUsd: {
      $multiply: [`$$pos.holdingSize`, `$$pos.symbol.quote.change`],
    },
  }),
];
