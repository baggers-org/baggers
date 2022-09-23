import express from 'express';
import { updateSecurities } from './app/updateSecurities';
import cron from 'node-cron';
import dotenv from 'dotenv';
import { updateQuotes } from './app/updateQuotes';

dotenv.config();

const { QUOTES_SCHEDULE, SECURITIES_SCHEDULE } = process.env;

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

if (SECURITIES_SCHEDULE) {
  console.log(
    'Scheduling security updates with cron expression: ',
    SECURITIES_SCHEDULE
  );
  cron.schedule(SECURITIES_SCHEDULE, () => {
    updateSecurities();
  });
} else {
  console.log(
    'Security updates turned off because QUOTES_SCHEDULE is not defined'
  );
}

if (QUOTES_SCHEDULE) {
  cron.schedule(QUOTES_SCHEDULE, () => {
    console.log(
      'Scheduling quote updates with cron expression: ',
      QUOTES_SCHEDULE
    );
    updateQuotes();
  });
} else {
  console.log(
    'Quote updates turned off because QUOTES_SCHEDULE is not defined'
  );
}
