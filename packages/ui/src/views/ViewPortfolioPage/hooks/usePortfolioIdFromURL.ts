import { useRouter } from 'next/router';
import { useMemo } from 'react';

export const usePortfolioIdFromURL = (): string | undefined => {
  const { query } = useRouter();
  return useMemo(() => {
    if (Array.isArray(query.id)) {
      return query.id[0];
    }
    return query.id;
  }, [query]);
};
