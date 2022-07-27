import { PipelineStage } from 'mongoose';

export const populateOwner: PipelineStage[] = [
  {
    $lookup: {
      from: `users`,
      foreignField: `_id`,
      localField: 'owner',
      as: 'owner',
    },
  },
  {
    $unwind: `$owner`,
  },
];
