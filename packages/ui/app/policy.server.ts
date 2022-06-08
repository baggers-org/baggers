import { LoaderFunction, redirect } from '@remix-run/server-runtime';
import { baggersApiAuthenticator, refreshTokens } from './auth.server';
import { commitSession, getSession } from './session.server';

type PolicyCallback<PolicyResult> = (
  input: PolicyResult,
) => Promise<ReturnType<LoaderFunction>>;

export type Policy<PolicyResult> = (
  request: Request,
  callback: PolicyCallback<PolicyResult>,
) => Promise<ReturnType<LoaderFunction>>;

const refreshTokensAndSetCookie = async (
  request: Request,
  headers: Headers,
  refreshToken: string,
) => {
  const newTokens = await refreshTokens(refreshToken);
  const session = await getSession(request.headers.get(`cookie`));

  const oldUser = session.get(`user`);

  const newUser = {
    ...oldUser,
    ...newTokens,
  };

  session.set(`user`, newUser);
  headers.append(`Set-Cookie`, await commitSession(session));

  if (request.method === `GET`) {
    throw redirect(request.url, {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  }

  return newTokens.accessToken;
};

/**
 * Checks if a user is authenticated.
 *
 * If they are not the app wil throw an redirect back to `/`
 *
 * If tokens are expired they will be refreshed
 *
 * @param request Request from remix loader/action
 * @param headers optionally pass in a headers object, this will allow you to send headers with
 * `Set-Cookie` back in your action response
 * @returns
 */
export const authenticate = async (
  request: Request,
  headers?: Headers,
): Promise<string> => {
  const user = await baggersApiAuthenticator.authenticate(`auth0`, request, {
    failureRedirect: `/`,
  });

  if (Date.now() > user.expires) {
    return refreshTokensAndSetCookie(
      request,
      headers || new Headers(),
      user.refreshToken,
    );
  }

  return user.accessToken;
};

/**
 * Same as authenticate- except it allows unauthenticated users
 */
export const isAuthenticated = async (
  request: Request,
  headers?: Headers,
): Promise<string | undefined> => {
  const user = await baggersApiAuthenticator.isAuthenticated(request);

  if (user && Date.now() > user.expires) {
    return refreshTokensAndSetCookie(
      request,
      headers || new Headers(),
      user.refreshToken,
    );
  }

  return user?.accessToken;
};
