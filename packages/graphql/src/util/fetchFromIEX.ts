import fetch, { RequestInit } from 'node-fetch';

export const fetchFromIEX = async (endpoint: string, options?: RequestInit) =>
  fetch(
    `${process.env.IEX_BASE_URL}${endpoint}/?token=${process.env.IEX_TOKEN}`,
    {
      ...options,
      headers: {
        'Content-Type': `application/json`,
      },
    },
  );
