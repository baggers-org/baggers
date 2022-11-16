import { envSchema } from 'env-schema';
import process from 'process';
import { Static, TString, Type } from '@sinclair/typebox';

export function setupEnv(keys: string[]) {
  const schema = Type.Object({
    ...keys.reduce<Record<string, TString>>(
      (ac, cur) => ({ ...ac, [cur]: Type.String() }),
      {}
    ),
  });

  console.log('env ', process.cwd());
  type Schema = Static<typeof schema>;

  return envSchema<Schema>({
    schema,
    dotenv: process.env.NODE_ENV === 'development',
  });
}
