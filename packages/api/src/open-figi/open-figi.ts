import fetch, { RequestInit } from 'node-fetch';
const OPEN_FIGI_URL = `https://api.openfigi.com`;
const VERSION = `v3`;

const { OPEN_FIGI_KEY } = process.env;
if (!OPEN_FIGI_KEY) throw new Error(`OPEN_FIGI_KEY not set`);

export const openFigiFetch = async (endpoint: string, options?: RequestInit) =>
  fetch(`${OPEN_FIGI_URL}/${VERSION}${endpoint}`, {
    headers: {
      'content-type': `application/json`,
      ...options?.headers,
      'X-OPENFIGI-APIKEY': OPEN_FIGI_KEY,
    },
    ...options,
  });

export type OpenFigiResponse = Array<{
  data?: Array<{
    figi: string;
    name: string;
    ticker: string;
    exchCode: string;
  }>;
  error?: string;
  warning?: string;
}>;
