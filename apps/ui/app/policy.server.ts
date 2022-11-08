import { User } from '@baggers/graphql-types';
import { getSdk } from '@baggers/sdk';
import { LoaderFunction, redirect } from '@remix-run/server-runtime';
import { GraphQLClient } from 'graphql-request';
import { baggersApiAuthenticator, refreshTokens, Tokens } from './auth.server';
import { commitSession, getSession } from './session.server';

type PolicyCallback<PolicyResult> = (
  input: PolicyResult
) => Promise<ReturnType<LoaderFunction>>;

export type Policy<PolicyResult> = (
  request: Request,
  callback: PolicyCallback<PolicyResult>
) => Promise<ReturnType<LoaderFunction>>;

const refreshTokensAndSetCookie = async (
  request: Request,
  headers: Headers,
  refreshToken: string
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

  return newUser;
};

const getCypressUser = async (request: Request) => {
  const cypressHeader = request.headers.get(`X-Cypress`);
  if (!cypressHeader) throw Error(`No cypress header found`);
  const { API_URL } = process.env;

  if (!API_URL) throw Error('API URI not found');

  const user: User & Tokens = JSON.parse(cypressHeader);
  // Create the test user in the db if he does not exist
  const { usersFindOrCreate } = await getSdk(
    new GraphQLClient(`${API_URL}/graphql`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
  ).usersFindOrCreate({
    input: {
      _id: user._id,
      displayName: user.displayName,
      emails: user.emails,
      photos: user.photos,
    },
  });

  return { ...usersFindOrCreate, ...user };
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
  headers?: Headers
): Promise<User & Tokens> => {
  let user: User & Tokens;
  const cypressUserHeader = request.headers.get(`X-Cypress`);

  if (cypressUserHeader) {
    user = await getCypressUser(request);
  } else {
    user = await baggersApiAuthenticator.authenticate(`auth0`, request, {
      failureRedirect: `/`,
    });
  }

  if (Date.now() > user.expires) {
    return refreshTokensAndSetCookie(
      request,
      headers || new Headers(),
      user.refreshToken
    );
  }

  return user;
};

/**
 * Same as authenticate- except it allows unauthenticated users
 */
export const isAuthenticated = async (
  request: Request,
  headers?: Headers
): Promise<(User & Tokens) | null> => {
  let user: (User & Tokens) | null;
  const cypressUserHeader = request.headers.get(`X-Cypress`);

  if (cypressUserHeader) {
    user = await getCypressUser(request);
  } else {
    user = await baggersApiAuthenticator.isAuthenticated(request);
  }

  if (user && Date.now() > user.expires) {
    return refreshTokensAndSetCookie(
      request,
      headers || new Headers(),
      user.refreshToken
    );
  }

  return user;
};
