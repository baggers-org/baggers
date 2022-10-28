import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
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
  const envPath = path.join(__dirname, '../../packages/ui/.env');
  dotenv.config({
    path: envPath,
  });
}

export async function fetchTestSymbolData(mongoUri) {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();

    const results = await client
      .db('baggers')
      .collection('securities')
      .find(symbolFilter);

    await results.forEach((symbol) => {
      writeFileSync(
        `${path.join(__dirname, '../fixtures/', symbol.symbol)}.json`,
        JSON.stringify(symbol)
      );
    });
  } finally {
    client.close();
  }
}
