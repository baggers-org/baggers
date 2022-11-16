import { Authenticator } from 'remix-auth';
import {
  Auth0Strategy,
  Auth0StrategyOptions,
} from 'remix-auth-auth0';
import { env } from './env';
import { sessionStorage } from './session.server';
import { OnAuthenticate, Tokens } from './types';
import { getExpires } from './util';

export class Auth0Authenticator<
  TUser extends Record<string, unknown>
> {
  public authenticator: Authenticator<TUser & Tokens>;
  private strategyConfig: Auth0StrategyOptions;
  private onAuth?: OnAuthenticate<TUser>;

  constructor(onAuthFn?: OnAuthenticate<TUser>) {
    const {
      AUTH0_APP_URL,
      AUTH0_CLIENT_ID,
      AUTH0_CLIENT_SECRET,
      AUTH0_DOMAIN,
      AUTH0_AUDIENCE,
      AUTH0_SCOPE,
    } = env;

    this.onAuth = onAuthFn;
    this.strategyConfig = {
      clientID: AUTH0_CLIENT_ID,
      clientSecret: AUTH0_CLIENT_SECRET,
      domain: AUTH0_DOMAIN,
      callbackURL: `${AUTH0_APP_URL}/auth/auth0/callback`,
      scope: AUTH0_SCOPE,
      // Frontned will only ever communicate with the db via the GraphQL endpoint
      audience: AUTH0_AUDIENCE,
    };

    this.createAuthenticator();
    this.createStrategy();
  }

  private createAuthenticator() {
    this.authenticator = new Authenticator<TUser & Tokens>(
      sessionStorage
    );
  }

  private createStrategy(): Authenticator<TUser & Tokens> {
    const auth0Strategy = new Auth0Strategy(
      this.strategyConfig,
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

        try {
          const user = await this.onAuth?.(accessToken, profile);

          return {
            ...(user || {}),
            accessToken,
            refreshToken,
            expires: getExpires(expires_in),
          };
        } catch (e) {
          console.error(e);
          throw Error('onAuthenticate error');
        }
      }
    );

    return this.authenticator.use(
      auth0Strategy as any
    ) as Authenticator<TUser & Tokens>;
  }
}
