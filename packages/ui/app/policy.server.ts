import { LoaderFunction } from '@remix-run/server-runtime';
import { baggersApiAuthenticator } from './auth.server';
import { User } from './generated/graphql';

export type Policy<PolicyResult> = (
  request: Request,
  callback: (input: PolicyResult) => Promise<ReturnType<LoaderFunction>>,
) => Promise<ReturnType<LoaderFunction>>;

export const authenticated: Policy<{ user: User }> = async (
  request,
  callback,
) => {
  const user = await baggersApiAuthenticator.authenticate(`auth0`, request, {
    failureRedirect: `/`,
  });

  if (user) {
    return callback({
      user,
    });
  }
  return {};
};
