import { restClient } from '@polygon.io/client-js';
import { env } from './env';

export const defaultPolygonRestClient = () =>
  restClient(env.POLYGON_API_KEY);
