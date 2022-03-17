import { SymbolModel } from '@/db/entities';

export const loader = async () => {
  const symbols = await SymbolModel.find();

  // const quotes = await batchFetchQuotes(symbols);

  const writeResult = await SymbolModel.bulkWrite(
    [].map((q) => ({
      updateOne: {
        // Update
        filter: { _id: q.symbol_id },
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
