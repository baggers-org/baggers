import { PortfolioSummary } from '@baggers/graphql-types';
import { Link } from '@remix-run/react';
import { useT } from '~/hooks/useT';
import { tlsx } from '~/util/clsx';
import { PortfolioCardChart } from './portfolio-card-chart';
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
      to={`/portfolios/${portfolio._id}/overview`}
      className={tlsx(
        'dark:bg-dark-grey-800 bg-paper-light',
        'rounded-2xl',
        'h-[600px]',
        'drop-shadow-md',
        'hover:cursor-pointer',
        'hover:outline hover:dark:outline-primary-dark hover:outline-primary-light',
        'transition-[outline_0.001s_ease-in]',
        'flex',
        'flex-col',
        'group'
      )}
    >
      <PortfolioCardInnerCard>
        <div>
          <PortfolioCardHeader portfolio={portfolio} />
          <div className="flex place-content-center mt-12">
            <PortfolioCardTotalValue portfolio={portfolio} />
          </div>
        </div>
        <PortfolioCardChart />
        <PortfolioCardPerformance portfolio={portfolio} />
      </PortfolioCardInnerCard>
      <PortfolioCardTags portfolio={portfolio} />
      <button
        className={tlsx(
          'dark:bg-secondary-dark dark:opacity-100',
          'opacity-[0.85] bg-[#1A2030]',
          'text-paper-light',
          'px-8 py-1',
          'rounded-br-3xl',
          'rounded-tl-3xl',
          'bottom-0',
          'right-0',
          'mt-auto',
          'ml-auto',
          'transition-all',
          'z-20',
          'absolute',
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
