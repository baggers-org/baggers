import { Quote, Security } from '@baggers/sdk';
import axios from 'axios';

export type FetchQuotesResponse = {
  [symbol: string]: {
    quote: Quote;
  };
};
export const fetchQuotes = async (
  securities: Security[]
): Promise<FetchQuotesResponse> => {
  const url = `${
    process.env.IEX_BASE_URL
  }stock/market/batch?symbols=${encodeURIComponent(
    securities.map((s) => s.symbol).join(`,`)
  )}&types=quote&token=${process.env.IEX_TOKEN}`;

  console.log('Fetching ', securities.length, ' quotes from IEX.');

  const res = await axios(url);

  return res.data;
};
