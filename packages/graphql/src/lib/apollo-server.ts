import { ApolloServer } from 'apollo-server-lambda';
import { createGraphQLSchema } from '../db/createGraphQLSchema';
import { authenticate } from '../util/authenticate';

export const createHandler = async () => {
  const schema = await createGraphQLSchema();

  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    tracing: true,
    debug: true,

    formatError: (error) => {
      console.error(error);
      return error;
    },
    playground: {
      endpoint: `/graphql`,
      settings: {
        'schema.polling.enable': false,
      },
    },
    context: ({ event, context }) => {
      const claims = event?.requestContext?.authorizer?.claims;
      console.log(claims);

      return {
        event,
        context,
        identity: claims,
        isLoggedIn: () => authenticate(!!claims),
        iexToken: process.env.IEX_TOKEN,
      };
    },
  });

  return apolloServer.createHandler({
    cors: {
      origin: process.env.WEB_ORIGIN,
      credentials: true,
    },
  });
};
