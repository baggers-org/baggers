import { envSchema } from 'env-schema';
import { Static, Type } from '@sinclair/typebox';

const schema = Type.Object({
  POLYGON_API_KEY: Type.String(),
  POLYGON_REST_URI: Type.String(),
  MONGO_URI: Type.String(),
});

type Schema = Static<typeof schema>;

export const env = envSchema<Schema>({
  schema,
  data: process.env.CI
    ? {
        POLYGON_API_KEY: 'test',
        POLYGON_REST_URI: 'test',
        MONGO_URI: 'test',
      }
    : undefined,
});
