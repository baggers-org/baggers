import { envSchema } from 'env-schema';
import { Static, Type } from '@sinclair/typebox';

const schema = Type.Object({
  ATLAS_CLUSTER_URI: Type.String(),
});

type Schema = Static<typeof schema>;

export const env = envSchema<Schema>({
  schema,
});
