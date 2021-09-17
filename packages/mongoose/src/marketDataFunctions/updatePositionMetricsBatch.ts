import { ObjectId } from 'mongoose';
import { models } from '../mongoose';
import { PositionDocumentPopulated } from '../mongoose/interfaces';
import calculatePositionMetrics from './calculatePositionMetrics';

/**
 * Calculates various position metrics based on an aggregated position, quote and portfolio
 * Using the latest market data this function will calculate metrics such as:
 * - Market Value
 * - Percent Change
 * - Change
 * - Exposure
 * @param positionIds Array of position _ids to update
 */
const updatePositionMetricsBatch = async (positionIds: Array<ObjectId>) => {
  console.log(`Updating positions with latest market data`);

  const cursor = await models.Position?.aggregate([
    {
      $match: {
        _id: {
          $in: positionIds,
        },
      },
    },
    {
      $lookup: {
        from: `symbols`,
        localField: `symbol`,
        foreignField: `_id`,
        as: `symbol`,
      },
    },
    {
      $unwind: {
        path: `$symbol`,
      },
    },
    {
      $lookup: {
        from: `portfolios`,
        localField: `portfolio`,
        foreignField: `_id`,
        as: `portfolio`,
      },
    },
    {
      $lookup: {
        from: `quotes`,
        localField: `symbol.quote`,
        foreignField: `_id`,
        as: `symbol.quote`,
      },
    },
    {
      $unwind: {
        path: `$portfolio`,
      },
    },
    {
      $unwind: {
        path: `$symbol.quote`,
      },
    },
  ]).exec();

  const bulkUpdateOperations: any = [];
  cursor.forEach((position: PositionDocumentPopulated) => {
    bulkUpdateOperations.push({
      updateOne: {
        filter: {
          _id: position._id,
        },
        update: {
          $set: {
            ...calculatePositionMetrics(position),
          },
        },
      },
    });
  });

  const res = await models.Position?.bulkWrite(bulkUpdateOperations);
  if (res?.modifiedCount) {
    console.log(`Successfully update ${res.modifiedCount} positions`);
  }

  return;
};
export default updatePositionMetricsBatch;
