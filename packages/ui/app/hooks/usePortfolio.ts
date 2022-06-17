import { useMatches } from '@remix-run/react';
import { PortfolioQuery } from '~/generated/graphql';

export const usePortfolio = () => {
  const { portfolio } = useMatches().find(
    (m) => m.id === `routes/__app/portfolios.$id`,
  )?.data as PortfolioQuery;

  return portfolio;
};