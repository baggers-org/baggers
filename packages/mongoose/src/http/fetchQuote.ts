import { ObjectId } from 'mongoose';
import fetch from 'node-fetch';
import { IQuote } from '../mongoose/interfaces';

const fetchQuote = async (symbol: string) => {
  const url = `${process.env.IEX_BASE_URL}stock/${symbol}/quote/?token=${process.env.IEX_TOKEN}`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': `application/json`,
    },
  });

  // TODO: replace SYMBol with id to prevent collisions for same stock names
  if (res.ok) {
    return (await res.json()) as Omit<IQuote, 'symbol'> & { symbol: ObjectId };
  } else {
    console.error(await res.text());
  }
};

export default fetchQuote;
