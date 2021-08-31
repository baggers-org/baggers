import { createHandler } from '../lib/apollo-server';

exports.graphqlHandler = async (event: any, context: any) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return (await createHandler())(event, context, undefined);
};
