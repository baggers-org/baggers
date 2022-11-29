import { env } from './env';
import axios from 'axios';
type PagintedFetchCallback<TResultsType> = () => Promise<{
  next_url?: string;
  results: TResultsType[];
}>;

export async function paginatedFetch<TResultsType>(
  fetchFn: PagintedFetchCallback<TResultsType>,
  config: { limit: number } = { limit: 10 }
): Promise<TResultsType[]> {
  try {
    let { next_url, results } = await fetchFn();

    while (next_url) {
      const { data } = await axios.get(next_url, {
        params: {
          apiKey: env.POLYGON_API_KEY,
          limit: config.limit,
        },
      });

      next_url = data.next_url;
      results = [...results, ...data.results];
    }
    return results;
  } catch (e) {
    console.error(
      'There was an error in polygon adapter paginatedFetch'
    );
    console.error(e);
    throw e;
  }
}
