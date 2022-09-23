import { Quote, Security } from '@baggers/graphql-types';
import { fetchQuotes } from './fetchQuotes';

export const batchFetchQuotes = async (
  securities: Array<Security>,
  fetchRate = 100
) => {
  const promiseQueue: Promise<Quote[]>[] = [];
  const tForQuoteData = Date.now();

  for (let i = 0; i < securities.length; i += 100) {
    const batch = securities.slice(i, i + 100);
    promiseQueue.push(
      new Promise((resolve, reject) => {
        fetchQuotes(batch)
          .then((res) => {
            resolve(Object.values(res).map((r) => r.quote));
          })
          .catch((err) => {
            console.error(err);
            reject();
          });
      })
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
    }ms`
  );
  return quotesArray as any;
};
