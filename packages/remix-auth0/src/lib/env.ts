import { setupEnv } from '@baggers/env';

export const env = setupEnv([
  'AUTH0_CLIENT_ID',
  'AUTH0_CLIENT_SECRET',
  'AUTH0_APP_URL',
  'AUTH0_AUDIENCE',
  'AUTH0_SCOPE',
  'AUTH0_DOMAIN',
  'AUTH0_SECRET',
  'NODE_ENV',
]);
