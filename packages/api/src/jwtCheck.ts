import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

export const jwtCheck = (config: any = {}) => {
  const { AUTH0_DOMAIN, API_URI } = process.env;
  if (!AUTH0_DOMAIN) throw Error(`No AUTH0_DOMAIN in environment`);
  if (!API_URI) throw Error(`No API_URI in environment`);
  return jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),
    audience: `${API_URI}/graphql`,
    issuer: `https://${AUTH0_DOMAIN}/`,
    algorithms: [`RS256`],
    credentialsRequired: false,
    ...config,
  });
};
