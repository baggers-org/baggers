import { getTypeComposer } from '../util';

const addRelations = () => {
  getTypeComposer(`Symbol`).addRelation(`quote`, {
    resolver: getTypeComposer(`Quote`).mongooseResolvers.findById(),
    prepareArgs: {
      _id: (source: any) => source.quote,
    },
    projection: { quote: true },
  });
};
export const addQuoteGraphQL = () => {
  addRelations();
};
