import { LoaderFunction } from 'remix';
import { baggersApiAuthenticator } from './auth.server';
import { User } from './generated/graphql';

export type Policy<PolicyResult> = (
  request: Request,
  callback: (input: PolicyResult) => Promise<ReturnType<LoaderFunction>>,
) => Promise<ReturnType<LoaderFunction>>;

export const authenticated: Policy<{ user: User }> = async (
  request,
  callback,
) =>
  callback({
    user: await baggersApiAuthenticator.authenticate(`auth0`, request, {
      failureRedirect: `/`,
    }),
  });
