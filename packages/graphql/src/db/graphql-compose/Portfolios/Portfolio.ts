import { schemaComposer } from 'graphql-compose';
import {
  requireAuthenticatedResourceOwner,
  getTypeComposer,
  onlyOwnerCanMutate,
  recordRequestOwner,
} from '../util';

const addQueries = () => {
  schemaComposer.Query.addFields({
    myPortfolios: getTypeComposer(`Portfolio`)
      .mongooseResolvers.findMany()
      .wrapResolve(requireAuthenticatedResourceOwner),
    getPortfolioById: getTypeComposer(`Portfolio`).mongooseResolvers.findById(),
  });
};

const addMutations = () => {
  schemaComposer.Mutation.addFields({
    createPortfolio: getTypeComposer(`Portfolio`)
      .mongooseResolvers.createOne({
        record: {
          removeFields: [`positions`, `owner`, `_id`],
        },
      })
      .wrapResolve(recordRequestOwner),

    updatePortfolio: getTypeComposer(`Portfolio`)
      .mongooseResolvers.updateById({
        record: {
          removeFields: [`positions`, `owner`, `_id`],
        },
      })
      .wrapResolve(recordRequestOwner),

    removePortfolio: getTypeComposer(`Portfolio`)
      .mongooseResolvers.removeById()
      .wrapResolve(onlyOwnerCanMutate),
  });
};

const addRelations = () => {
  getTypeComposer(`Portfolio`).addRelation(`positions`, {
    resolver: getTypeComposer(`Position`).getResolver(`getPositions`),
    prepareArgs: {
      filter: (source: any) => ({ portfolio: source._id }),
    },
    projection: { positions: true },
  });
};
export const addPortfolioGraphQL = () => {
  addQueries();
  addMutations();
  addRelations();
};
