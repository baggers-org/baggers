import { Form } from '@remix-run/react';
import { PortfolioCard } from '~/components/Portfolios/PortfolioCard';
import { tlsx } from '~/util/clsx';
import { CreatedHeader } from './created-header';
import { CreatePortfoliosProps } from './types';

export function CreatedPortfolios({
  portfolios,
}: CreatePortfoliosProps) {
  return (
    <>
      <CreatedHeader />

      <div
        className={tlsx(
          'grid grid-cols-1 gap-12',
          'md:grid-cols-2',
          'xl:grid-cols-3',
          '2xl:grid-cols-4',
          '3xl:grid-cols-5',
          '4xl:grid-cols-6'
        )}
      >
        {portfolios.map((portfolio) => (
          <PortfolioCard portfolio={portfolio} key={portfolio._id} />
        ))}
      </div>
    </>
  );
}
