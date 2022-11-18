/// <reference path="../global.d.ts" />

jest.mock('@baggers/env', () => ({
  setupEnv: () => {
    const config = require('dotenv').config({
      path: '../../.env.example',
    }).parsed;

    return config;
  },
}));

process.env.TZ = 'GMT';
