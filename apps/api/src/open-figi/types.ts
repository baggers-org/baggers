export enum OpenFigiMappingIdTypes {
  ID_ISIN = 'ID_ISIN',
  ID_CUSIP = 'ID_CUSIP',
  ID_SEDOL = 'ID_SEDOL',
  TICKER = 'TICKER',
}
export type OpenFigiMappingJob = {
  idType: OpenFigiMappingIdTypes;
  idValue: string;
};
export type OpenFigiMappingRequest = Array<OpenFigiMappingJob>;
export type OpenFigiMappingResponseItem = {
  figi: string;
  name: string;
  ticker: string;
  exchCode: string;
};
export type OpenFigiMappingResponse = Array<{
  data?: Array<OpenFigiMappingResponseItem>;
  error?: string;
  warning?: string;
}>;
