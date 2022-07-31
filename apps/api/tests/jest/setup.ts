import { INestApplication } from '@nestjs/common';
import { setupTestApp } from '../util/db-util';
import './mocks';

let app: INestApplication;
let url: string;

export const getApp = () => app;
export const getAppUrl = () => url;

process.env.TZ = 'UTC';

beforeAll(async () => {
  if (!app) {
    app = await setupTestApp();
    if (app) {
      url = await app.getUrl();
    }
  }
});

afterAll(async () => {
  if (app) {
    await app.close();
  }
});
