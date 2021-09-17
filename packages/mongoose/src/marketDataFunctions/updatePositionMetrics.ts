import { ObjectId } from 'mongoose';
import { models } from '../mongoose';
import {
  IPosition,
  PositionDocument,
  PositionDocumentPopulated,
} from '../mongoose/interfaces';
import calculatePositionMetrics from './calculatePositionMetrics';

const updatePositionMetrics = async (
  positionId: ObjectId,
): Promise<PositionDocument | undefined> => {
  const doc = await models.Position?.findById(positionId)
    .populate(`portfolio`)
    .populate({
      path: `symbol`,
      populate: {
        path: `quote`,
      },
    })
    .exec();

  const metrics = calculatePositionMetrics(doc as PositionDocumentPopulated);
  Object.entries(metrics).map(([key, value]) => {
    if (doc && key) {
      doc[key as keyof IPosition] = value as never;
    }
  });

  console.log(`Updating position metrics for `, doc?.symbol);

  await doc?.save();
  console.log(`Successfully updated position metrics for `, doc?.symbol);

  return doc?.toJSON() as PositionDocument;
};

export default updatePositionMetrics;
