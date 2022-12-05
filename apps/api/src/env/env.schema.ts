import { setupEnv } from '@baggers/env';

export const env = setupEnv([
  'PLAID_CLIENT_ID',
  'PLAID_CLIENT_SECRET',
  'PLAID_ENV',
  'API_URL',
  'ATLAS_CLUSTER_URI',
  'SESSION_SECRET',
  'AUTH0_DOMAIN',
  'POLYGON_REST_URI',
  'POLYGON_API_KEY',
  'NODE_ENV',
  'OPEN_FIGI_KEY',
  'WS_URL',
]);
