import { GraphQLClient } from 'graphql-request';
import { Authenticator } from 'remix-auth';
import { Auth0Strategy } from 'remix-auth-auth0';
import { FindOrCreateUserInput, getSdk, User } from './generated/graphql';
import { apiBaseUrl } from './graphql/sdk.server';
import { sessionStorage } from './session.server';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  expires: number;
}

const {
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL,
  AUTH0_SCOPE,
  AUTH0_AUDIENCE,
  API_URI,
} = process.env;

if (!AUTH0_DOMAIN) throw new Error(`Missing Auth0 domain.`);
if (!AUTH0_CLIENT_ID) throw new Error(`Missing Auth0 client id.`);
if (!AUTH0_CLIENT_SECRET) throw new Error(`Missing Auth0 client secret.`);
if (!AUTH0_SCOPE) throw new Error(`Missing Auth0 scope.`);
if (!AUTH0_AUDIENCE) throw new Error(`Missing Auth0 audience.`);
if (!AUTH0_CALLBACK_URL) throw new Error(`Missing Auth0 redirect uri.`);
if (!API_URI) throw new Error(`Missing API_URI.`);

export const auth0 = {
  clientID: AUTH0_CLIENT_ID,
  clientSecret: AUTH0_CLIENT_SECRET,
  domain: AUTH0_DOMAIN,
  callbackURL: AUTH0_CALLBACK_URL,
  scope: AUTH0_SCOPE,
  // Frontned will only ever communicate with the db via the GraphQL endpoint
  audience: AUTH0_AUDIENCE,
};

// This authenticator will be used for
export const baggersApiAuthenticator = new Authenticator<User & Tokens>(
  sessionStorage,
);

export const findOrCreateUser = (user: User & Tokens) => {

}

/**
 * Returns the unix timestamp when accessTokens are invalid
 * @param expires_in Expires_in (number of seconds till expiry from auth0)
 */
export const getExpires = (expires_in: number) => {
  const expiresInMs = expires_in * 1000;
  return Date.now() + expiresInMs;
};

const auth0Strategy = new Auth0Strategy(
  auth0,
  async ({
    profile,
    accessToken,
    refreshToken,
    extraParams: { expires_in },
  }) => {
    const user: FindOrCreateUserInput = {
      _id: profile.id,
      displayName: profile.displayName,
      emails: profile.emails.map((e) => e.value),
      photos: profile.photos.map((e) => e.value),
    };

    try {
      const { findOrCreateUser: result } = await getSdk(
        new GraphQLClient(apiBaseUrl, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }),
      ).findOrCreateUser({ record: user });

      return {
        ...result.record,
        accessToken,
        refreshToken,
        expires: getExpires(expires_in),
      };
    } catch (e) {
      console.error(e);
      throw Error(`There was an error fetching the user. `);
    }
  },
);

baggersApiAuthenticator.use(auth0Strategy);

/**
 * Refresh user tokens using the refresh_token grant
 */
export const refreshTokens = async (refreshToken: string): Promise<Tokens> => {
  const body = new URLSearchParams({
    grant_type: `refresh_token`,
    client_id: AUTH0_CLIENT_ID,
    client_secret: AUTH0_CLIENT_SECRET,
    refresh_token: refreshToken,
  });

  const response = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
    method: `post`,
    headers: {
      'content-type': `application/x-www-form-urlencoded`,
    },
    body,
  });

  const newTokens = (await response.json()) as {
    access_token: string;
    expires_in: number;
  };

  return {
    accessToken: newTokens?.access_token,
    refreshToken,
    expires: getExpires(newTokens.expires_in),
  };
};
