import { getIexEnv } from './getIexEnv';

export const iexFetch = async (
  endpoint: string,
  params?: Record<string, string | boolean | number>,
) => {
  const { IEX_BASE_URL, IEX_TOKEN } = getIexEnv();

  console.log(endpoint, IEX_BASE_URL);

  const url = new URL(`${IEX_BASE_URL}${endpoint}`);
  console.log(url);

  url.searchParams.set('token', IEX_TOKEN);

  if (params?.length) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value.toString());
    }
  }
  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  }

  console.error(response);
  throw Error(`IEX Status Error - ${response.status} - ${response.statusText}`);
};
