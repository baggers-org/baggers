import { INestApplication } from '@nestjs/common';
import { register } from 'tsconfig-paths';
register();
import { setupTestApp } from '../util/db-util';

let app: INestApplication;

export const getApp = () => app;

module.exports = async function () {
  if (!app) {
    app = await setupTestApp();
    console.log('Connected to app, url is ', await app.getUrl());
  }
};
