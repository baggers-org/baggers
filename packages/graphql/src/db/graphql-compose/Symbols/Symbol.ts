import { BaggersMongoose } from '@baggers/mongoose';
import { schemaComposer } from 'graphql-compose';
import { getTypeComposer } from '../util';

const addResolvers = () => {
  getTypeComposer(`Symbol`).addResolver({
    name: `searchSymbols`,
    type: getTypeComposer(`Symbol`).getTypePlural(),
    kind: `query`,
    args: {
      search: `String!`,
    },
    resolve: async ({ args }: any) => {
      const aggregate = await BaggersMongoose.models.Symbol?.aggregate([
        {
          $search: {
            index: `searchSymbols`,
            text: {
              query: args.search,
              path: `symbol`,
            },
          },
        },
      ]).limit(5);
      return aggregate;
    },
  });
};

const addQueries = () => {
  schemaComposer.Query.addFields({
    searchSymbols: getTypeComposer(`Symbol`).getResolver(`searchSymbols`),
  });
};

export const addSymbolGraphQL = () => {
  addResolvers();
  addQueries();
};
