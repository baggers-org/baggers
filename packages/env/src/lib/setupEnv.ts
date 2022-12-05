import { envSchema } from 'env-schema';
import { join } from 'path';
import { Static, TString, Type } from '@sinclair/typebox';

export function setupEnv<TKey extends string>(keys: readonly TKey[]) {
  const schema = Type.Object({
    ...keys.reduce<Record<TKey, TString>>(
      (ac, cur) => ({ ...ac, [cur]: Type.String() }),
      {} as Record<TKey, TString>
    ),
  });

  type Schema = Static<typeof schema>;

  return envSchema<Schema>({
    schema,
    dotenv:
      process.env.NODE_ENV === 'development'
        ? {
            path: join(__dirname, `../../../.env`),
          }
        : undefined,
  });
}
