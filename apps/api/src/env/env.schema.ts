import * as joi from 'joi';

export const env = {
  PLAID_CLIENT_ID: joi.required(),
  PLAID_CLIENT_SECRET: joi.required(),
  PLAID_ENV: joi.required(),
  API_SERVICE_HOST: joi.required(),
  ATLAS_CLUSTER_URI: joi.required(),
  SESSION_SECRET: joi.required(),
  AUTH0_DOMAIN: joi.required(),
  POLYGON_REST_URI: joi.required(),
  POLYGON_API_KEY: joi.required(),
  NODE_ENV: joi.required().valid('development', 'production', 'test'),
  OPEN_FIGI_KEY: joi.required(),
};

export const EnvironmentSchema = joi.object(env);
