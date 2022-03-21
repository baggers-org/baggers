import { jwtCheck } from '@/jwtCheck';
import express from 'express';
import { updateSymbols } from './updateSymbols';

const cronApp = express.Router();

cronApp.use(
  jwtCheck({
    credentialsRequired: true,
    audience: `${process.env.API_URI}/cron`,
  }),
);

cronApp.post(`/updateSymbols`, async () => {
  return updateSymbols();
});

export { cronApp };
