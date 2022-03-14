import { ObjectId } from 'mongodb';
import { PipelineStage } from 'mongoose';

export const matchPortfolioById = (
  id: ObjectId,
  userId: string,
): PipelineStage => ({
  $match: {
    _id: id,
    $or: [
      {
        private: false,
      },
      {
        private: true,
        owner: userId,
      },
    ],
  },
});
