import express from 'express';
import { updateSecurities } from './app/updateSecurities';
import cron from 'node-cron';
import dotenv from 'dotenv';
import { updateQuotes } from './app/updateQuotes';

dotenv.config();
const app = express();

app.get('/healthcheck', (req, res) => {
  res.sendStatus(200);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(
    `Baggers Cron Scheduler started - healthcheck listening on http://localhost:${port}/healthcheck`
  );
});
server.on('error', console.error);

cron.schedule('0 21 * * 1-5', () => {
  updateSecurities();
});

cron.schedule('*/30 8-17 * * 1-5', () => {
  updateQuotes();
});
