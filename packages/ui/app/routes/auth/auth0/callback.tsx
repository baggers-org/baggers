import { LoaderFunction } from 'remix';
import { baggersApiAuthenticator } from '~/auth.server';

export const loader: LoaderFunction = async ({ request }) =>
  baggersApiAuthenticator.authenticate(`auth0`, request, {
    successRedirect: `/portfolios/created`,
    failureRedirect: `/`,
  });
