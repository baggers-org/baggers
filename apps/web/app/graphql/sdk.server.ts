import { getSdk } from '~/generated/graphql';
import { GraphQLClient } from 'graphql-request';
import { authenticate, isAuthenticated } from '~/policy.server';

const { API_URI } = process.env;

if (!API_URI) throw new Error(`API_URI not set`);
export const apiBaseUrl = `${API_URI}/graphql`;

export const authenticatedSdk = async (
  request: Request,
  headers?: Headers,
): Promise<ReturnType<typeof getSdk>> => {
  const { accessToken } = await authenticate(request, headers);

  console.log(`Authenticated sdk called`);

  return getSdk(
    new GraphQLClient(apiBaseUrl, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }),
  );
};

export const unauthenticatedSdk = async (
  request: Request,
  headers?: Headers,
): Promise<ReturnType<typeof getSdk>> => {
  const user = await isAuthenticated(request, headers);
  console.log(`Unautheneticated sdk called`);

  const accessToken = user?.accessToken;
  return getSdk(
    new GraphQLClient(apiBaseUrl, {
      headers: accessToken
        ? {
            authorization: `Bearer ${accessToken}`,
          }
        : undefined,
    }),
  );
};
