import { websocketClient } from '@polygon.io/client-js';
import { env } from './env';

export const defaultPolygonWebsocketClient = () =>
  websocketClient(env.POLYGON_API_KEY);
