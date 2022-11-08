import { useMatches } from '@remix-run/react';
import { Portfolio, PortfoliosFindByIdQuery } from '@baggers/graphql-types';

export const usePortfolio = () => {
  const { portfoliosFindById } = useMatches().find(
    (m) => m.id === `routes/__app/portfolios.$id`
  )?.data as PortfoliosFindByIdQuery;

  return portfoliosFindById as Portfolio;
};
