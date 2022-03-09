import { Authenticator } from 'remix-auth';
import { Auth0Strategy } from 'remix-auth-auth0';
import { FindOrCreateUserInput, User } from './generated/graphql';
import { sdk } from './graphql/sdk.server';
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
  const user : FindOrCreateUserInput = {
    displayName: profile.displayName,
    emails: profile.emails.map(e => e.value),
    photos: profile.photos.map(e => e.value),
    sub: profile.id
  }
  try {

    const { findOrCreateUser } = await sdk.findOrCreateUser({ record: user})
    return findOrCreateUser.record
  } catch (e) {
    console.error(e)
    throw Error('There was an error fetching the user. ')
  }
});

baggersApiAuthenticator.use(auth0Strategy);
