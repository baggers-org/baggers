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
} from '@/db/resolvers';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { UserMutations } from './db/resolvers/mutations/user-mutations';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import { GraphQLContext } from './types/GraphQLContext';
import { authChecker } from './util/authChecker';

const getApolloServerHandler = async () => {
  const { ATLAS_CLUSTER_URI, AUTH0_DOMAIN, AUTH0_API_AUDIENCE } = process.env;
  if (!ATLAS_CLUSTER_URI) throw Error(`No ATLAS_CLUSTER_URI in environment`);
  if (!AUTH0_DOMAIN) throw Error(`No AUTH0_DOMAIN in environment`);
  if (!AUTH0_API_AUDIENCE) throw Error(`No AUTH0_API_AUDIENCE in environment`);

  const app = express();

  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),
    audience: AUTH0_API_AUDIENCE,
    issuer: `https://${AUTH0_DOMAIN}/`,
    algorithms: [`RS256`],
    credentialsRequired: false,
  });

  app.use(jwtCheck);

  const httpServer = http.createServer(app);

  await connect(ATLAS_CLUSTER_URI);

  const schema = await buildSchema({
    resolvers: [
      PortfolioQueries,
      PortfolioMutations,
      SymbolQueries,
      UserMutations,
    ],
    authChecker: authChecker,
    emitSchemaFile:
      process.env.NODE_ENV === `development`
        ? `../../ui/schema.gql`
        : undefined,
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
