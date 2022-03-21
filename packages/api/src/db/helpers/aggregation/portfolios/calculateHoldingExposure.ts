import { PipelineStage } from 'mongoose';
import { addFieldToHolding } from './addFieldToHolding';

export const calculateHoldingExposure = (
  holdingsField = `$holdings`,
): PipelineStage[] => [
  addFieldToHolding(holdingsField, {
    exposure: {
      $divide: [`$$pos.marketValue`, `$totalValue`],
    },
  }),
];
