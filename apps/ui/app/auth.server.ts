import { CreateUserInput, User } from '@baggers/graphql-types';
import { getSdk } from '@baggers/sdk';

import { GraphQLClient } from 'graphql-request';
import { Authenticator } from 'remix-auth';
import { Auth0Strategy } from 'remix-auth-auth0';
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
  API_URL,
} = process.env;

if (!AUTH0_DOMAIN) throw new Error(`Missing Auth0 domain.`);
if (!AUTH0_CLIENT_ID) throw new Error(`Missing Auth0 client id.`);
if (!AUTH0_CLIENT_SECRET) throw new Error(`Missing Auth0 client secret.`);
if (!AUTH0_CALLBACK_URL) throw new Error(`Missing Auth0 redirect uri.`);

export const auth0 = {
  clientID: AUTH0_CLIENT_ID,
  clientSecret: AUTH0_CLIENT_SECRET,
  domain: AUTH0_DOMAIN,
  callbackURL: AUTH0_CALLBACK_URL,
  scope: 'openid profile email offline_access',
  // Frontned will only ever communicate with the db via the GraphQL endpoint
  audience: `${API_URL}/graphql`,
};

// This authenticator will be used for
export const baggersApiAuthenticator = new Authenticator<User & Tokens>(
  sessionStorage
);

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
    if ((profile._json as any)?.error) {
      console.error(profile._json);
      throw Error(`Auth0 userinfo error`);
    }

    const user: CreateUserInput = {
      _id: profile.id,
      displayName: profile.displayName,
      emails: profile.emails.map((e) => e.value),
      photos: profile.photos.map((e) => e.value),
    };

    try {
      const { usersFindOrCreate } = await getSdk(
        new GraphQLClient(`${API_URL}/graphql`, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        })
      ).usersFindOrCreate({ input: user });

      return {
        ...usersFindOrCreate,
        accessToken,
        refreshToken,
        expires: getExpires(expires_in),
      };
    } catch (e) {
      console.error(e);
      throw Error(`There was an error fetching the user. `);
    }
  }
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
