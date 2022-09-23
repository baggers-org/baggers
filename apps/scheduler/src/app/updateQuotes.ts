import { batchFetchQuotes } from '../util/batchFetchQuotes';
import { Logger } from '../util/log';
import { baggersDb } from '../util/mongo';
import { getAllOwnedSecurites } from '../util/securityFilter';

export const updateQuotes = async () => {
  const logger = new Logger('[updateQuotes]');

  logger.log('Begin');

  const quotes = await batchFetchQuotes(await getAllOwnedSecurites());
  logger.log('Retrieved ', quotes.length, ' quotes.');

  const t = Date.now();

  logger.log('Update quotes in database');
  const writeResult = await baggersDb()
    .collection('securities')
    .bulkWrite(
      quotes.map((quote) => {
        return {
          updateOne: {
            filter: { symbol: quote.symbol },
            update: {
              $set: {
                quote,
              },
            },
            upsert: true,
          } as any,
        };
      })
    );

  logger.log(writeResult);
  logger.log('Updated in ', (Date.now() - t) / 1000, ' seconds.');

  logger.log('Finish');
};
