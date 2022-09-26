import { updateSecurities } from './app/updateSecurities';
import cron from 'node-cron';
import dotenv from 'dotenv';
import { updateQuotes } from './app/updateQuotes';

dotenv.config();

const { QUOTES_SCHEDULE, SECURITIES_SCHEDULE } = process.env;

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
  console.log(
    'Scheduling quote updates with cron expression: ',
    QUOTES_SCHEDULE
  );
  cron.schedule(
    QUOTES_SCHEDULE,
    () => {
      updateQuotes();
    },
    {
      timezone: 'America/New_York',
    }
  );
} else {
  console.log(
    'Quote updates turned off because QUOTES_SCHEDULE is not defined'
  );
}
