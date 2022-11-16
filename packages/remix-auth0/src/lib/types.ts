import { AuthenticateOptions } from 'remix-auth';
import { Auth0Profile } from 'remix-auth-auth0';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  expires: number;
}

export type OnAuthenticate<TUser> = (
  accessToken: string,
  profile: Auth0Profile
) => Promise<TUser>;

export type Auth0RoutesConfig = Pick<
  AuthenticateOptions,
  'successRedirect' | 'failureRedirect' | 'throwOnError' | 'context'
>;
