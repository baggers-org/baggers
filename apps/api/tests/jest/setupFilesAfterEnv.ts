/// <reference path="../global.d.ts" />

import { WebSocketServer } from 'ws';

let server;
// LMAO: this is so mad - u need to change this
jest.mock('@baggers/env', () => {
  let port = Math.floor(Math.random() * 5000 + 2000);
  server = new WebSocketServer({
    port,
  });
  return {
    setupEnv: () => {
      const config = require('dotenv').config({
        path: '../../.env.example',
      }).parsed;

      return { ...config, WS_URL: `ws://localhost:${port}` };
    },
  };
});

export const getWsServer = () => server;

afterAll(() => {
  server.close();
});

process.env.TZ = 'GMT';
