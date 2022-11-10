import { mongoClient } from '@baggers/mongo-client';
import { getTickerSnapshots } from './get-ticker-snapshots';

getTickerSnapshots(mongoClient());
