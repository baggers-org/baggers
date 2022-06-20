import { defineConfig } from 'cypress';

import dotenv from 'dotenv';

if (process.env.CYPRESS_BASE_URL === 'https://baggers-staging.fly.dev') {
  dotenv.config({ path: './packages/ui/.env.staging' });
  dotenv.config({ path: './packages/api/.env.staging' });
} else {
  dotenv.config({ path: './packages/api/.env' });
  dotenv.config({ path: './packages/ui/.env' });
}

const {
  CYPRESS_AUTH0_USERNAME,
  CYPRESS_AUTH0_PASSWORD,
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_CALLBACK_URL,
  AUTH0_AUDIENCE,
  AUTH0_SCOPE,
} = process.env;

if (!process.env.ATLAS_CLUSTER_URI)
  throw Error('No Atlas cluster uri in environment');

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    env: {
      Auth0Username: CYPRESS_AUTH0_USERNAME,
      Auth0Password: CYPRESS_AUTH0_PASSWORD,
      Auth0Domain: AUTH0_DOMAIN,
      Auth0ClientId: AUTH0_CLIENT_ID,
      Auth0ClientSecret: AUTH0_CLIENT_SECRET,
      Auth0CallbackUrl: AUTH0_CALLBACK_URL,
      Auth0Audience: AUTH0_AUDIENCE,
      Auth0Scope: AUTH0_SCOPE,
    },
  },
});
