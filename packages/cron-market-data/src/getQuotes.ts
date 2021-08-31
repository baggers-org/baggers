import { BaggersMongoose } from '@baggers/mongoose';
import { getAllOwnedSymbols } from './symbols/getAllOwnedSymbols';

import dotenv from 'dotenv';
import { ObjectId } from 'mongoose';

dotenv.config({
  path: `.env${process.env.NODE_ENV === `development` ? `.local` : ``}`,
});

export async function run(_: any, context: any) {
  if (context) {
    context.callbackWaitsForEmptyEventLoop = false;
  }

  if (!process.env.ATLAS_CLUSTER_URI) {
    throw new Error(`No Atlas Cluster URI in environment`);
  }

  if (!process.env.IEX_BASE_URL) {
    throw new Error(`IEX_BASE_URL not set in environment`);
  }

  if (!process.env.IEX_TOKEN) {
    throw new Error(`IEX_TOKEN not set in environment`);
  }
  const t = Date.now();
  const conn = await BaggersMongoose.init(process.env.ATLAS_CLUSTER_URI);
  console.log('Iniatilised MongoDB in connection in ', Date.now() - t, 'ms');

  const symbols = await getAllOwnedSymbols();

  // Update all symbols with latest intra day price
  await BaggersMongoose.marketDataFunctions.updateSymbolQuoteBatch(
    symbols.map((s) => s._id as any),
  );

  const positions = await BaggersMongoose.models.Position?.find();
  const ids = positions?.map((pos) => pos._id as ObjectId);
  // update all positions given latest market data
  if (ids) {
    await BaggersMongoose.marketDataFunctions.updatePositionMetricsBatch(ids);
  }
  console.log('Closing db');
  await conn.close();
  console.log('Closed db');
  process.exit(0);
  console.log('Exited process');
}
