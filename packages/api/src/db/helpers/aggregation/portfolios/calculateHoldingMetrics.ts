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
      $multiply: [`$$pos.symbol.quote.latestPrice`, `$$pos.quantity`],
    },
  }),
  addFieldToHolding(holdingsField, {
    profitLossPercent: {
      $multiply: [
        {
          $divide: [
            {
              $subtract: [`$$pos.marketValue`, `$$pos.costBasis`],
            },
            `$$pos.costBasis`,
          ],
        },
        100,
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
      $multiply: [`$$pos.quantity`, `$$pos.symbol.quote.change`],
    },
  }),
];
