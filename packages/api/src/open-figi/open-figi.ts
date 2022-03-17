import { ApolloError } from 'apollo-server-core';
import fetch, { RequestInit } from 'node-fetch';
const OPEN_FIGI_URL = `https://api.openfigi.com`;
const VERSION = `v3`;

const openFigiFetch = async (endpoint: string, options?: RequestInit) =>
  fetch(`${OPEN_FIGI_URL}/${VERSION}${endpoint}`, {
    headers: {
      'content-type': `application/json`,
      ...options?.headers,
    },
    ...options,
  });

export interface MapToFigiInput {
  isin?: string;
  cusip?: string;
  sedol?: string;
}
export interface MapToFigiReturn {
  figi: string;
  name: string;
  ticker: string;
  exchCode: string;
}
export const mapToFigi = async <TInput extends MapToFigiInput[]>(
  input: TInput,
): Promise<MapToFigiReturn[]> => {
  const getValues = ({ isin, cusip, sedol }: MapToFigiInput) => {
    let idType, idValue;

    if (isin) {
      idType = `ID_ISIN`;
      idValue = isin;
    }
    if (cusip) {
      idType = `ID_CUSIP`;
      idValue = cusip;
    }
    if (sedol) {
      idType = `ID_SEDOL`;
      idValue = sedol;
    }

    return {
      idType,
      idValue,
    };
  };

  const data = input.map(getValues);

  const response = await openFigiFetch(`/mapping`, {
    method: `post`,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.error(response.statusText);
    throw new ApolloError(`Error mapping figi from open figi`);
  }

  const results = (await response.json()) as {
    data: MapToFigiReturn[];
  }[];

  return results.map((res) => res.data?.[0] || null);
};
