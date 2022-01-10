import { BaggersMongoose } from '@baggers/mongoose';
import { schemaComposer } from 'graphql-compose';
import { addHolidaysAndTradingDatesGraphQL } from './graphql-compose/Misc';
import { addPortfolioGraphQL } from './graphql-compose/Portfolios/Portfolio';
import { addPositionGraphQL } from './graphql-compose/Positions/Position';
import { addQuoteGraphQL } from './graphql-compose/Quotes/Quote';
import { addSymbolGraphQL } from './graphql-compose/Symbols/Symbol';
import { initSchemaComposer } from './graphql-compose/util';

/**
 * Creates the GraphQL schema using graphql-compose and graphql-compose-mongoose
 * Plug directly into apollo-server
 *
 * @returns built GraphQL Schema
 */
export const createGraphQLSchema = async () => {
  // TODO: yarn link this to the local package
  if (!process.env.ATLAS_CLUSTER_URI)
    throw Error(`No Atlas Cluster URI in environment unable to connect to DB`);

  await BaggersMongoose.init(process.env.ATLAS_CLUSTER_URI);
  if (schemaComposer.size === 0) {
    initSchemaComposer();
    addPositionGraphQL();
    addPortfolioGraphQL();
    addSymbolGraphQL();
    addQuoteGraphQL();
    addHolidaysAndTradingDatesGraphQL();
  }
  return schemaComposer.buildSchema();
};
