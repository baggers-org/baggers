import { Injectable } from '@nestjs/common';
import { IRestClient, restClient } from '@polygon.io/client-js';
import { EnvService } from '@api/env';

@Injectable()
export class PolygonService {
  public client: IRestClient;

  constructor(private envService: EnvService) {
    this.client = restClient(envService.get('POLYGON_API_KEY'));
  }
}
