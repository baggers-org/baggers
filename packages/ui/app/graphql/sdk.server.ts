import { getSdk, SdkFunctionWrapper } from '~/generated/graphql';
import { client } from './GraphQLClient.server';

const withAuth: SdkFunctionWrapper = async (action) => {
  if (global?.accessToken) {
    return action({
      authorization: `Bearer ${global.accessToken}`,
    });
  }
  return action();
};
export const sdk = getSdk(client, withAuth);
