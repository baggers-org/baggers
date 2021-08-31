import { BaggersMongoose } from "@baggers/mongoose";
import { getTypeComposer } from "../util";

const addRemovePositionsResolver = () =>
  getTypeComposer(`Position`).addResolver({
    name: `removePositions`,
    type: getTypeComposer(`Position`).mongooseResolvers.removeMany().getType(),
    args: {
      ids: `[MongoID]`,
    },
    resolve: async ({ args: { ids } }: any) => {
      const positionsToRemove = await BaggersMongoose.models.Position?.find({
        _id: { $in: ids },
      }).exec();

      const updatePortfolioOperations: any = [];
      positionsToRemove?.forEach((position) => {
        updatePortfolioOperations.push({
          updateOne: {
            filter: {
              _id: position.portfolio,
            },
            update: {
              $pull: { positions: position._id },
            },
          },
        });
      });
      const removedResult = await BaggersMongoose.models.Position?.remove({
        _id: { $in: ids },
      }).exec();

      await BaggersMongoose.models.Portfolio?.bulkWrite(
        updatePortfolioOperations
      );

      return {
        numAffected: removedResult.deletedCount,
      };
    },
  });

export default addRemovePositionsResolver;
