import { QuoteDocument } from '../mongoose/interfaces';
import fetchQuotes from './fetchQuotes';

const batchFetchQuotes = async (symbols: Array<string>, fetchRate = 30) => {
  const promiseQueue = [];
  const tForQuoteData = Date.now();
  for (let i = 0; i < symbols.length; i += 100) {
    promiseQueue.push(
      new Promise((resolve, reject) => {
        fetchQuotes(symbols.slice(i, i + 100))
          .then((newQuotes) => {
            resolve(newQuotes);
          })
          .catch((err) => {
            console.error(err);
            reject();
          });
      }),
    );
    await new Promise((res) => {
      setTimeout(() => {
        res(null);
      }, fetchRate);
    });
  }
  // TODO: fetch leftover batch, ie. last iteration not even 100
  const quotesArray = await Promise.all(promiseQueue);

  const allQuotes = quotesArray.reduce((acc, curr) => {
    acc = {
      ...(acc as Record<string, unknown>),
      ...(curr as Record<string, unknown>),
    };
    return acc;
  }, {}) as Record<string, { quote: QuoteDocument }>;

  const numberOfFetchedQuotes = Object.keys(allQuotes).length;

  console.log(
    `Fetched market data for ${numberOfFetchedQuotes} symbols in - ${
      Date.now() - tForQuoteData
    }ms`,
  );
  return allQuotes;
};

export default batchFetchQuotes;
