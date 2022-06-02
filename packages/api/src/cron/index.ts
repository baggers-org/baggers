import { jwtCheck } from '@/jwtCheck';
import express from 'express';
import { updateQuotes } from './updateQuotes';
import { updateSymbols } from './updateSymbols';

const cronApp = express.Router();

cronApp.use(
  jwtCheck({
    credentialsRequired: true,
    audience: `${process.env.API_URI}/cron`,
  }),
);

cronApp.post(`/updateSymbols`, async (req, res) => {
  try {
    const result = await updateSymbols();
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

cronApp.post(`/updateQuotes`, async (req, res) => {
  try {
    const result = await updateQuotes();
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

export { cronApp };
