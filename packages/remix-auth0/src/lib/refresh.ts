import { env } from './env';
import { Tokens } from './types';
import { getExpires } from './util';

/**
 * Refresh user tokens using the refresh_token grant
 */
export const refreshTokens = async (
  refreshToken: string
): Promise<Tokens> => {
  const { AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_DOMAIN } = env;
  const body = new URLSearchParams({
    grant_type: `refresh_token`,
    client_id: AUTH0_CLIENT_ID,
    client_secret: AUTH0_CLIENT_SECRET,
    refresh_token: refreshToken,
  });

  const response = await fetch(
    `https://${AUTH0_DOMAIN}/oauth/token`,
    {
      method: `post`,
      headers: {
        'content-type': `application/x-www-form-urlencoded`,
      },
      body,
    }
  );

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
