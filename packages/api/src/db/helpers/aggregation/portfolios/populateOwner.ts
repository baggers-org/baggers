import { PipelineStage } from 'mongoose';

export const populateOwner = (ownerField = `owner`): PipelineStage[] => [
  {
    $lookup: {
      from: `users`,
      foreignField: `_id`,
      localField: ownerField,
      as: ownerField,
    },
  },
  {
    $unwind: `$${ownerField}`,
  },
];
