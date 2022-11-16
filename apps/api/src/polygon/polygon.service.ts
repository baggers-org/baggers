import { Injectable } from '@nestjs/common';
import { IRestClient, restClient } from '@polygon.io/client-js';
import { env } from '~/env/env.schema';

@Injectable()
export class PolygonService {
  public client: IRestClient;

  constructor() {
    this.client = restClient(env.POLYGON_API_KEY);
  }
}
