import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { Auth0Authenticator } from './authenticator';
import { Auth0RoutesConfig } from './types';

export class Auth0Routes<TUser extends Record<string, unknown>> {
  public loader: LoaderFunction;
  public action: ActionFunction;
  private auth0Authenticator: Auth0Authenticator<TUser>;
  private options?: Auth0RoutesConfig;

  constructor(
    authenticator: Auth0Authenticator<TUser>,
    options?: Auth0RoutesConfig
  ) {
    this.auth0Authenticator = authenticator;
    this.options = options;

    this.setLoader();
    this.setAction();
  }

  private setLoader() {
    this.loader = ({ params, request }) => {
      if (params['*']?.includes('/callback')) {
        try {
          return this.auth0Authenticator.authenticator.authenticate(
            `auth0`,
            request,
            this.options
          );
        } catch (e) {
          console.error(e);

          return new Response(
            JSON.stringify({
              message: `There was an error authenticating`,
            }),
            { status: 500 }
          );
        }
      }
      return null;
    };
  }

  private setAction() {
    this.action = ({ params, request }) => {
      if (params['*']?.includes('/login')) {
        try {
          return this.auth0Authenticator.authenticator.authenticate(
            `auth0`,
            request,
            this.options
          );
        } catch (e) {
          console.error(e);
          return new Response(
            JSON.stringify({
              message: `There was an error authenticating the user`,
            }),
            { status: 500 }
          );
        }
      }
      if (params['*']?.includes('/logout')) {
        try {
          return this.auth0Authenticator.authenticator.logout(
            request,
            { redirectTo: '/' }
          );
        } catch (e) {
          console.error(e);
          return new Response(
            JSON.stringify({
              message: `There was an error authenticating the user`,
            }),
            { status: 500 }
          );
        }
      }
    };
  }
}
