import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { Security } from '@baggers/graphql-types';
import { writeFileSync } from 'fs';

const symbols = ['ONDS', 'TSLA', 'BRK.A'];
const symbolFilter = {
  _id: {
    $in: symbols,
  },
};
// We will only need the value of the dev ATLAS cluster
// so just require .env
if (!process.env.CI) {
  dotenv.config({
    path: 'apps/ui/.env',
  });
}

export async function fetchTestSymbolData(mongoUri) {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();

    const results = await client
      .db('baggers')
      .collection<Security>('securities')
      .find(symbolFilter);

    await results.forEach((symbol) => {
      writeFileSync(
        `${path.join(__dirname, '../fixtures/', symbol._id)}.json`,
        JSON.stringify(symbol)
      );
    });
  } finally {
    client.close();
  }
}
