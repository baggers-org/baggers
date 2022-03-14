import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const { PLAID_ENV, PLAID_CLIENT_ID, PLAID_CLIENT_SECRET } = process.env;

if (!PLAID_ENV) throw new Error(`PLAID_ENV not set`);
if (!PLAID_CLIENT_ID) throw new Error(`PLAID_CLIENT_ID not set`);
if (!PLAID_CLIENT_SECRET) throw new Error(`PLAID_CLIENT_SECRET not set`);

const config = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_CLIENT_SECRET,
    },
  },
});
const plaidClient = new PlaidApi(config);

export { plaidClient };
