import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import { ObjectId } from 'mongodb';
import { connect } from 'mongoose';
import { buildSchema } from 'type-graphql';
import express from 'express';
import http from 'http';

import { ObjectIdScalar } from '@/db/object-id.scalar';
import {
  PortfolioQueries,
  PortfolioMutations,
  SymbolQueries,
} from '@/db/resolvers';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

const getApolloServerHandler = async () => {
  if (!process.env.ATLAS_CLUSTER_URI)
    throw Error(`No ATLAS_CLUSTER_URI in environment`);

  const app = express();
  const httpServer = http.createServer(app);

  await connect(process.env.ATLAS_CLUSTER_URI);

  const schema = await buildSchema({
    resolvers: [PortfolioQueries, PortfolioMutations, SymbolQueries],
    emitSchemaFile: process.env.NODE_ENV === `development`,
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
  });

  const plugins = [ApolloServerPluginDrainHttpServer({ httpServer })];

  const server = new ApolloServer({
    schema,
    plugins,
  });
  await server.start();

  server.applyMiddleware({ app });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

getApolloServerHandler().catch(console.error);
