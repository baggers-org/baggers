import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';
import { fetchTestSymbolData } from './src/scripts/fetchTestSymbolData';

import dotenv from 'dotenv';

if (!process.env.CI) {
  dotenv.config({ path: '../web/.env' });
  dotenv.config({ path: '../api/.env' });
}

fetchTestSymbolData(process.env.CYPRESS_ATLAS_CLUSTER_URI);

const {
  CYPRESS_FF_USER,
  CYPRESS_FF_PASS,
  CYPRESS_CHROME_USER,
  CYPRESS_CHROME_PASS,
  CYPRESS_AUTH0_DOMAIN,
  CYPRESS_AUTH0_CLIENT_ID,
  CYPRESS_AUTH0_CLIENT_SECRET,
  CYPRESS_AUTH0_CALLBACK_URL,
  CYPRESS_AUTH0_AUDIENCE,
  CYPRESS_AUTH0_SCOPE,
} = process.env;

export default defineConfig({
  projectId: '1hdkja',
  chromeWebSecurity: false,
  e2e: {
    ...nxE2EPreset(__filename),
    video: !!process.env.CI,
    baseUrl: process.env.CI
      ? 'https://baggers-staging.fly.dev'
      : 'http://localhost:3000',
    env: {
      FirefoxUser: CYPRESS_FF_USER,
      FirefoxPassword: CYPRESS_FF_PASS,
      ChromeUser: CYPRESS_CHROME_USER,
      ChromePassword: CYPRESS_CHROME_PASS,
      Auth0Domain: CYPRESS_AUTH0_DOMAIN,
      Auth0ClientId: CYPRESS_AUTH0_CLIENT_ID,
      Auth0ClientSecret: CYPRESS_AUTH0_CLIENT_SECRET,
      Auth0CallbackUrl: CYPRESS_AUTH0_CALLBACK_URL,
      Auth0Audience: CYPRESS_AUTH0_AUDIENCE,
      Auth0Scope: CYPRESS_AUTH0_SCOPE,
    },
  },
});
