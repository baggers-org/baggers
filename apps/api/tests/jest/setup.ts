/// <reference path="../global.d.ts" />
import { INestApplication } from '@nestjs/common';
import { setupTestApp } from '../util/db-util';
import './mocks';

jest.mock('@baggers/env', () => ({
  setupEnv: () => {
    if (!process.env.CI) {
      const config = require('dotenv').config().parsed;
      console.log(config);

      return config;
    }

    return {};
  },
}));

let app: INestApplication;
let url: string;

export const getApp = () => app;
export const getAppUrl = () => url;

process.env.TZ = 'GMT';

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
