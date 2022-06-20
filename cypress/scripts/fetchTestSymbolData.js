const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

const { writeFileSync } = require('fs');
const path = require('path');
const symbols = ['ONDS', 'TSLA', 'BRK.A'];
const symbolFilter = {
  symbol: {
    $in: symbols,
  },
};
// We will only need the value of the dev ATLAS cluster
// so just require .env
const envPath = path.join(__dirname, '../../packages/api/.env');
dotenv.config({
  path: envPath,
});

async function fetchTestSymbolData(mongoUri) {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();

    const results = await client
      .db('baggers')
      .collection('symbols')
      .find(symbolFilter);

    await results.forEach((symbol) => {
      console.log('Writing ', symbol.symbol);

      writeFileSync(
        `${path.join(__dirname, '../fixtures/', symbol.symbol)}.json`,
        JSON.stringify(symbol),
      );
    });
  } finally {
    client.close();
  }
}

fetchTestSymbolData(process.env.ATLAS_CLUSTER_URI)
  .then(console.log)
  .catch(console.error);
