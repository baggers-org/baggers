import * as joi from 'joi';

export const env = {
  PLAID_CLIENT_ID: joi.required(),
  PLAID_CLIENT_SECRET: joi.required(),
  PLAID_ENV: joi.required(),
  API_URI: joi.required(),
  ATLAS_CLUSTER_URI: joi.required(),
  SESSION_SECRET: joi.required(),
  AUTH0_DOMAIN: joi.required(),
  IEX_BASE_URL: joi.required(),
  IEX_TOKEN: joi.required(),
  NODE_ENV: joi.required().valid('development', 'production', 'test'),
  OPEN_FIGI_KEY: joi.required(),
};

export const EnvironmentSchema = joi.object(env);
