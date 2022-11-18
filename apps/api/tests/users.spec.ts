import { usersFindByIdTest } from './suites/users/queries/usersFindById.test';
import { usersFindOrCreateTest } from './suites/users/mutations/usersFindOrCreate.test';
import { setupTestApp } from './util/db-util';
import { INestApplication } from '@nestjs/common';
describe('Users', () => {
  let app: INestApplication;
  beforeAll(async () => {
    app = await setupTestApp();
  });
  describe('Queries', () => {
    usersFindByIdTest();
  });

  describe('Mutations', () => {
    usersFindOrCreateTest();
  });

  afterAll(async () => {
    await app.close();
  });
});
