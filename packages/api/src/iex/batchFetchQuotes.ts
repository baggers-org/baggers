import { Quote, Symbol } from '@/db/entities';
import { ObjectId } from 'mongodb';
import { fetchQuotes } from './fetchQuotes';

export const batchFetchQuotes = async (
  symbols: Array<Symbol>,
  fetchRate = 100,
) => {
  const promiseQueue: Promise<Quote & { symbol_id: ObjectId }[]>[] = [];
  const tForQuoteData = Date.now();

  for (let i = 0; i < symbols.length; i += 100) {
    const batch = symbols.slice(i, i + 100);
    promiseQueue.push(
      new Promise((resolve, reject) => {
        fetchQuotes(batch)
          .then((newQuotes) => {
            console.log(`Fetched quotes successfully`);
            resolve(newQuotes as any);
          })
          .catch((err) => {
            console.error(err);
            console.log(batch);
            process.exit(1);
            reject();
          });
      }),
    );
    // eslint-disable-next-line no-await-in-loop
    await new Promise((res) => {
      setTimeout(() => {
        res(null);
      }, fetchRate);
    });
  }
  // TODO: fetch leftover batch, ie. last iteration not even 100
  const quotesArray = await (await Promise.all(promiseQueue)).flatMap((d) => d);

  const numberOfFetchedQuotes = Object.keys(quotesArray).length;

  console.log(
    `Fetched market data for ${numberOfFetchedQuotes} symbols in - ${
      Date.now() - tForQuoteData
    }ms`,
  );
  return quotesArray;
};
