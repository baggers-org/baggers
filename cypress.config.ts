import { defineConfig } from 'cypress';

import dotenv from 'dotenv';

if (!process.env.CI) {
  dotenv.config({ path: './packages/api/.env' });
  dotenv.config({ path: './packages/ui/.env' });
}

const {
  CYPRESS_AUTH0_USERNAME,
  CYPRESS_AUTH0_PASSWORD,
  CYPRESS_AUTH0_DOMAIN,
  CYPRESS_AUTH0_CLIENT_ID,
  CYPRESS_AUTH0_CLIENT_SECRET,
  CYPRESS_AUTH0_CALLBACK_URL,
  CYPRESS_AUTH0_AUDIENCE,
  CYPRESS_AUTH0_SCOPE,
} = process.env;

console.log(process.env);

export default defineConfig({
  projectId: '1hdkja',
  e2e: {
    baseUrl: process.env.CI
      ? 'https://baggers-staging.fly.dev'
      : 'http://localhost:3000/',
    env: {
      Auth0Username: CYPRESS_AUTH0_USERNAME,
      Auth0Password: CYPRESS_AUTH0_PASSWORD,
      Auth0Domain: CYPRESS_AUTH0_DOMAIN,
      Auth0ClientId: CYPRESS_AUTH0_CLIENT_ID,
      Auth0ClientSecret: CYPRESS_AUTH0_CLIENT_SECRET,
      Auth0CallbackUrl: CYPRESS_AUTH0_CALLBACK_URL,
      Auth0Audience: CYPRESS_AUTH0_AUDIENCE,
      Auth0Scope: CYPRESS_AUTH0_SCOPE,
    },
  },
});
