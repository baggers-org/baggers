import { SymbolModel } from '@/db/entities';
import { batchFetchQuotes } from '@/iex';

export const loader = async () => {
  const symbols = await SymbolModel.find();

  const quotes = await batchFetchQuotes(symbols);

  const writeResult = await SymbolModel.bulkWrite(
    quotes.map((q) => ({
      updateOne: {
        // Update
        filter: { _id: (q as any).symbol_id },
        update: {
          $set: {
            quote: q,
          },
        },
        upsert: true,
      },
    })),
  );

  console.log(writeResult);

  return {
    ok: true,
  };
};
