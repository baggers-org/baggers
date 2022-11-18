import { INestApplication } from '@nestjs/common';
import { securitiesFindByIdTest } from './suites/securities/queries/securitiesFindById.test';
import { setupTestApp } from './util/db-util';

describe('Securities', () => {
  let app: INestApplication;
  beforeAll(async () => {
    app = await setupTestApp();
  });

  describe('Queries', () => {
    securitiesFindByIdTest();
  });

  afterAll(async () => {
    await app.close();
  });
});
