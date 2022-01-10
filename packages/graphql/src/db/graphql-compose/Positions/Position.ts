import { schemaComposer } from 'graphql-compose';
import addPosition from './addPosition';
import removePosition from './removePosition';
import {
  requireAuthenticatedResourceOwner,
  getTypeComposer,
  onlyOwnerCanMutate,
} from '../util';
import addRemovePositionsResolver from './removePositions';

import { addGetPositionsResolver } from './getPositions';
import { BaggersMongoose, PositionDocument } from '@baggers/mongoose';

const addResolvers = () => {
  addGetPositionsResolver();
  addRemovePositionsResolver();
};
const addQueries = () => {
  schemaComposer.Query.addFields({
    myPositions: getTypeComposer(`Position`)
      .getResolver(`getPositions`)
      .wrapResolve(requireAuthenticatedResourceOwner),
    getPositions: getTypeComposer(`Position`).getResolver(`getPositions`),
  });
};

const addMutations = () => {
  schemaComposer.Mutation.addFields({
    ...addPosition(),
    ...removePosition(),
    removePositions: getTypeComposer(`Position`)
      .getResolver(`removePositions`)
      .wrapResolve(onlyOwnerCanMutate)
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
            },
          );
          return doc;
        };
        return next(rp);
      }),
  });
};

const addRelations = () => {
  getTypeComposer(`Position`).addRelation(`symbol`, {
    resolver: getTypeComposer(`Symbol`).mongooseResolvers.findById(),
    prepareArgs: {
      _id: (source: any) => source.symbol,
    },
    projection: { symbol: true },
  });
};

export const addPositionGraphQL = () => {
  addResolvers();
  addQueries();
  addMutations();
  addRelations();
};
