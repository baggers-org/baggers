import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import { ObjectId } from 'mongodb';
import { connect } from 'mongoose';
import { buildSchema } from 'type-graphql';

import { ObjectIdScalar } from '@/db/object-id.scalar';
import {
  PortfolioQueries,
  PortfolioMutations,
  SymbolQueries,
} from '@/db/resolvers';

let handler: any;

let conn;

const getApolloServerHandler = async () => {
  if (!process.env.ATLAS_CLUSTER_URI)
    throw Error(`No ATLAS_CLUSTER_URI in environment`);

  if (!conn) {
    console.log(`No ATLAS connection in memory - connecting again`);
    conn = await connect(process.env.ATLAS_CLUSTER_URI);
  }

  if (!handler) {
    const schema = await buildSchema({
      resolvers: [PortfolioQueries, PortfolioMutations, SymbolQueries],
      emitSchemaFile: process.env.NODE_ENV === `development`,
      nullableByDefault: true,
      scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    });

    const server = new ApolloServer({
      schema,
      plugins:
        process.env.NODE_ENV === `development`
          ? [
              (
                await import(`apollo-server-core`)
              ).ApolloServerPluginLandingPageGraphQLPlayground(),
            ]
          : undefined,
    });
    await server.start();
  }
  return handler;
};
