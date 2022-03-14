import { PipelineStage } from 'mongoose';
import { addFieldToPosition } from './addFieldToPosition';

export const calculatePositionExposure = (
  positionsField = `$positions`,
): PipelineStage =>
  addFieldToPosition(positionsField, {
    exposure: {
      $divide: [`$$pos.marketValue`, `$totalValue`],
    },
  });
