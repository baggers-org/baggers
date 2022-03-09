import { Authenticator } from 'remix-auth';
import { Auth0Strategy } from 'remix-auth-auth0';
import { sessionStorage } from './session.server';

const {
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL,
} = process.env;

if (!AUTH0_DOMAIN) throw new Error(`Missing Auth0 domain.`);
if (!AUTH0_CLIENT_ID) throw new Error(`Missing Auth0 client id.`);
if (!AUTH0_CLIENT_SECRET) throw new Error(`Missing Auth0 client secret.`);
if (!AUTH0_CALLBACK_URL) throw new Error(`Missing Auth0 redirect uri.`);

export const auth0 = {
  clientID: AUTH0_CLIENT_ID,
  clientSecret: AUTH0_CLIENT_SECRET,
  domain: AUTH0_DOMAIN,
  callbackURL: AUTH0_CALLBACK_URL,
};

// This authenticator will be used for
export const baggersApiAuthenticator = new Authenticator<User>(sessionStorage);

const auth0Strategy = new Auth0Strategy(auth0, async ({ profile }) => {
  // Get the user data from your DB or API using the tokens and profile
    return profile;
});

baggersApiAuthenticator.use(auth0Strategy);
