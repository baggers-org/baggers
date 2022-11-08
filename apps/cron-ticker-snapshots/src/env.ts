import { envSchema } from 'env-schema';
import { Static, Type } from '@sinclair/typebox';

const schema = Type.Object({
  POLYGON_API_KEY: Type.String(),
  POLYGON_REST_URI: Type.String(),
  ATLAS_CLUSTER_URI: Type.String(),
});

type Schema = Static<typeof schema>;

export const env = envSchema<Schema>({
  schema,
  data:
    process.env.NODE_ENV === 'test'
      ? {
          POLYGON_API_KEY: 'test',
          POLYGON_REST_URI: 'test',
          ATLAS_CLUSTER_URI: 'test',
        }
      : undefined,
});
