import { useMatches } from '@remix-run/react';
import type { Portfolio } from '@baggers/graphql-types';

export const usePortfolio = () => {
  const portfolio = useMatches().find(
    (m) => m.id === `routes/__app/portfolios.$id`
  )?.data as Portfolio;

  return portfolio;
};
