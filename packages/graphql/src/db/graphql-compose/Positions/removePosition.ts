import { BaggersMongoose, PositionDocument } from '@baggers/mongoose';
import { getTypeComposer } from '../util';

const removePosition = () => ({
  removePosition: getTypeComposer(`Position`)
    .mongooseResolvers.removeById()
    .wrapResolve((next: any) => (rp: any) => {
      rp.beforeRecordMutate = async (doc: PositionDocument, rp: any) => {
        if (doc.owner !== rp.context.identity.sub) {
          throw new Error(
            `You do not own this resource, you are unable to modify it`,
          );
        }

        // Remove it from the portfolio
        await BaggersMongoose.models.Portfolio?.findByIdAndUpdate(
          doc.portfolio,
          {
            $pull: { positions: doc._id },
            $inc: {
              // TODO: this should be calculated client side, based on price
              totalValue: -doc.marketValue,
              numberOfPositions: -1,
            },
          },
        );
        return doc;
      };
      return next(rp);
    }),
});

export default removePosition;
