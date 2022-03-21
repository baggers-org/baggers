import { Symbol, SymbolModel } from '@/db/entities';
import { response } from 'express';
import fetch from 'node-fetch';

export const updateSymbols = async () => {
  const r = await fetch(
    `${process.env.IEX_BASE_URL}ref-data/symbols?token=${process.env.IEX_TOKEN}`,
  );

  if (!r.ok) {
    console.error(r);
    return {
      message: `There was an error with the response received from IEX`,
      originalResponse: r,
    };
  }

  const symbols = (await r.json()) as Omit<
    Symbol & { type: string },
    'symbolType'
  >[];

  console.log(
    `Updating symbols collection for `,
    symbols.length,
    ` symbols retrieved from IEX cloud.`,
  );

  const writeResult = await SymbolModel.bulkWrite(
    symbols.map((s) => ({
      updateOne: {
        // Update
        filter: { symbol: s.symbol, exchange: s.exchange },
        update: {
          $set: {
            ...s,
            symbolType: s.type,
          },
        },
        upsert: true,
      },
    })),
  );

  console.log(writeResult);

  return response.sendStatus(200);
};
