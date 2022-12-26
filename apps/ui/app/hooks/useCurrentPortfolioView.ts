import { useLocation } from '@remix-run/react';
import { usePortfolio } from './usePortfolio';

export function useCurrentPortfolioView(): string {
  const { pathname } = useLocation();

  const { _id } = usePortfolio();

  return (
    pathname.match(`portfolios/${_id}/([^/]*)`)?.[1] || 'Unknown'
  );
}
