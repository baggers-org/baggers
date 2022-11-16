import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { env } from '~/env/env.schema';
import { ImportedSecurity } from '~/securities';
import {
  OpenFigiMappingIdTypes,
  OpenFigiMappingJob,
  OpenFigiMappingResponse,
} from './types';

const OPEN_FIGI_URL = `https://api.openfigi.com`;
const VERSION = `v3`;

@Injectable()
export class OpenFigiService {
  // TODO: implement cache for mapping jobs
  // IE -> checkMappingJobCache(openFigiMappingJob): OpenFigiMappingResponseItem

  private securityToMappingJob(
    security: ImportedSecurity
  ): OpenFigiMappingJob {
    const { isin, cusip, sedol, ticker_symbol } = security;

    if (isin) {
      return {
        idType: OpenFigiMappingIdTypes.ID_ISIN,
        idValue: isin,
      };
    }
    if (cusip) {
      return {
        idType: OpenFigiMappingIdTypes.ID_CUSIP,
        idValue: cusip,
      };
    }
    if (sedol) {
      return {
        idType: OpenFigiMappingIdTypes.ID_SEDOL,
        idValue: sedol,
      };
    }
    // Default to using the ticker
    return {
      idType: OpenFigiMappingIdTypes.TICKER,
      idValue: ticker_symbol || '',
    };
  }

  public getFigiMapping(
    securities: ImportedSecurity[]
  ): Promise<AxiosResponse<OpenFigiMappingResponse>> {
    return axios.post(
      `${OPEN_FIGI_URL}/${VERSION}/mapping`,
      securities.map(this.securityToMappingJob),
      {
        headers: {
          'content-type': `application/json`,
          'X-OPENFIGI-APIKEY': env.OPEN_FIGI_KEY,
        },
      }
    );
  }
}
