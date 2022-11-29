import { tlsx } from '@baggers/ui-components/src/util/clsx';
import { Form } from '@remix-run/react';
import { PortfolioCard } from '~/components/Portfolios/PortfolioCard';
import { CreatedHeader } from './created-header';
import { CreatePortfoliosProps } from './types';

export function CreatedPortfolios({
  portfolios,
}: CreatePortfoliosProps) {
  return (
    <Form method="post">
      <CreatedHeader />

      <div
        className={tlsx(
          'space-x-2',
          'grid grid-cols-1 gap-3',
          'md:grid-cols-2',
          'xl:grid-cols-3',
          '2xl:grid-cols-4'
        )}
      >
        {portfolios.map((portfolio) => (
          <PortfolioCard portfolio={portfolio} />
        ))}
      </div>
    </Form>
  );
}
