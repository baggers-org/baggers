import { envSchema } from 'env-schema';
import { Static, Type } from '@sinclair/typebox';

const schema = Type.Object({
  POLYGON_API_KEY: Type.String(),
});

type Schema = Static<typeof schema>;

export const env = envSchema<Schema>({
  schema,
  data:
    process.env.NODE_ENV === 'test'
      ? {
          POLYGON_API_KEY: 'test',
        }
      : undefined,
});
