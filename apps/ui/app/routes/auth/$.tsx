import { Auth0Routes } from '@baggers/remix-auth0';
import { auth0Authenticator } from '~/server/authenticator.server';

export const { loader, action } = new Auth0Routes(
  auth0Authenticator,
  { successRedirect: '/portfolios/created' }
);
