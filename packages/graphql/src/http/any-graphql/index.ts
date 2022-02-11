import { createHandler } from '../../lib/apollo-server';

exports.handler = async (event: any, context: any) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return (await createHandler())(event, context, undefined);
};
