import 'reflect-metadata';

import { ApolloServer, ExpressContext } from 'apollo-server-express';
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
  ChartQueries,
} from '@/db/resolvers';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { UserMutations } from './db/resolvers/mutations/user-mutations';
import { GraphQLContext } from './types/GraphQLContext';
import { authChecker } from './util/authChecker';
import { PlaidMutations } from './db/resolvers/mutations/plaid-mutations';
import { cronApp } from './cron';
import { jwtCheck } from './jwtCheck';

const getApolloServerHandler = async () => {
  const app = express();

  app.use(`/graphql`, jwtCheck());
  app.use(`/cron`, cronApp);

  app.use(function (req, res, next) {
    req.socket.on('error', (err) => console.error(err));
    next();
  });

  const httpServer = http.createServer(app);

  const { ATLAS_CLUSTER_URI } = process.env;
  if (!ATLAS_CLUSTER_URI) throw Error(`No ATLAS_CLUSTER_URI in environment`);
  await connect(ATLAS_CLUSTER_URI);

  const schema = await buildSchema({
    resolvers: [
      PortfolioQueries,
      PortfolioMutations,
      PlaidMutations,
      ChartQueries,
      SymbolQueries,
      UserMutations,
    ],
    authChecker: authChecker,
    authMode: `null`,
    emitSchemaFile:
      process.env.NODE_ENV === `development` ? `../ui/schema.gql` : undefined,
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
  });

  const plugins = [ApolloServerPluginDrainHttpServer({ httpServer })];

  const server = new ApolloServer<
    ExpressContext & { req: Request & GraphQLContext }
  >({
    schema,
    plugins,
    context: ({ req }) => {
      return {
        user: req.user,
      };
    },
  });
  await server.start();

  server.applyMiddleware({ app });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

getApolloServerHandler().catch(console.error);
