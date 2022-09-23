import axios, { AxiosPromise } from 'axios';
import { getIexEnv } from './getIexEnv';

export const iexFetch = async <TRes>(
  endpoint: string,
  params?: Record<string, string | boolean | number>
): Promise<AxiosPromise<TRes>> => {
  const { IEX_BASE_URL, IEX_TOKEN } = getIexEnv();

  console.log('[iexFetch] - ', endpoint);

  const url = new URL(`${IEX_BASE_URL}${endpoint}`);

  url.searchParams.set('token', IEX_TOKEN);

  if (params?.length) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value.toString());
    }
  }

  const t = Date.now();
  const res = await axios(url.toString());

  console.log('[iexFetch] Success in ', (Date.now() - t) / 1000, ' seconds.');

  return res;
};
