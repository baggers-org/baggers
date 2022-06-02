import { SymbolModel } from '@/db/entities';
import { batchFetchQuotes } from '@/iex';

export const updateQuotes = async () => {
  const symbols = await SymbolModel.find();
  const quotes = await batchFetchQuotes(symbols);
  return SymbolModel.bulkWrite(
    quotes.map((q) => {
      return {
        updateOne: {
          // Update
          filter: { _id: q.symbol },
          update: {
            $set: {
              quote: q,
            },
          },
          upsert: true,
        },
      };
    }),
  );
};
