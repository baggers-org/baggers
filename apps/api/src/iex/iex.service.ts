import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { EnvService } from '~/env';

@Injectable()
export class IexService {
  public client: AxiosInstance;

  constructor(private envService: EnvService) {
    this.client = axios.create({
      baseURL: this.envService.get('IEX_BASE_URL'),
      params: {
        token: this.envService.get('IEX_TOKEN'),
      },
    });
  }
}
