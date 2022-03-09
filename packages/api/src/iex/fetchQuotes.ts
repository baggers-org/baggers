import { Quote, Symbol } from '@/db/entities';

export const fetchQuotes = async (symbols: Symbol[]) => {
  const quoteData: Quote[] = [];

  const url = `${
    process.env.IEX_BASE_URL
  }stock/market/batch?symbols=${encodeURIComponent(
    symbols.map((s) => s.symbol).join(`,`),
  )}&types=quote&token=${process.env.IEX_TOKEN}`;

  console.log(`Fetching quotes `, url);

  const res = await fetch(url);

  if (res.ok) {
    quoteData.push(await res.json());
  } else {
    console.log(res);
    throw new Error(await res.text());
  }

  return quoteData
    .flatMap((quoteMap) => Object.values(quoteMap))
    .map((d, index) => ({ ...d.quote, symbol_id: symbols[index]._id }));
};
