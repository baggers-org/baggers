import { Quote } from '@/db/entities';
import fetch from 'node-fetch';

export const fetchQuote = async (symbol: string): Promise<Quote> => {
  const r = await fetch(
    `${process.env.IEX_BASE_URL}/stock/${symbol}/quote?${process.env.IEX_TOKEN}`,
  );

  if (r.ok) {
    return (r.json() as unknown) as Quote;
  }

  throw new Error(`There was an error fetching quote data from IEX`);
};
