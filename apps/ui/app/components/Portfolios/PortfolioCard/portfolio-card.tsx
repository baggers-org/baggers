import { PortfolioSummary } from '@baggers/graphql-types';
import { Link } from '@remix-run/react';
import { useT } from '~/hooks/useT';
import { tlsx } from '~/util/clsx';
import { PortfolioCardHeader } from './portfolio-card-header';
import { PortfolioCardInnerCard } from './portfolio-card-inner-card';
import { PortfolioCardPerformance } from './portfolio-card-performance';
import { PortfolioCardTags } from './portfolio-card-tags';
import { PortfolioCardTotalValue } from './portfolio-card-total-value';

export type PortfolioCardProps = {
  portfolio: PortfolioSummary;
};
export function PortfolioCard({ portfolio }: PortfolioCardProps) {
  const t = useT('common');

  return (
    <Link
      to={`/portfolios/${portfolio._id}`}
      className={tlsx(
        'dark:bg-paper-dark bg-paper-light',
        'rounded-3xl',
        'h-[600px]',
        'hover:cursor-pointer',
        'hover:outline hover:dark:outline-primary-dark hover:outline-primary-light',
        'flex',
        'flex-col',
        'group'
      )}
    >
      <PortfolioCardInnerCard>
        <PortfolioCardHeader portfolio={portfolio} />
        <PortfolioCardTotalValue portfolio={portfolio} />
        <PortfolioCardPerformance portfolio={portfolio} />
      </PortfolioCardInnerCard>
      <PortfolioCardTags portfolio={portfolio} />
      <button
        className={tlsx(
          'dark:bg-secondary-dark dark:opacity-100',
          'opacity-[0.85] bg-[#1A2030]',
          'text-paper-light',
          'px-8 py-1',
          'rounded-r-3xl',
          'rounded-tl-3xl',
          'mt-auto',
          'ml-auto',
          'transition-all',
          'active:bg-secondary-light',
          'group-hover:underline',
          'group-hover:dark:bg-primary-dark',
          'group-hover:bg-primary-light'
        )}
      >
        {t('view_more', 'View more')}
      </button>
    </Link>
  );
}
