import { mongoClient } from '@baggers/mongo-client';
import { getTickerSnapshots } from './get-ticker-snapshots';

getTickerSnapshots(mongoClient())
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
