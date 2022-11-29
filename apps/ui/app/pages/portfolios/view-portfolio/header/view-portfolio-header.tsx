import { Tag } from '@baggers/ui-components';
import { HeaderBackdrop } from '~/components/header-backdrop';
import { tlsx } from '~/util/clsx';
import { ViewPortfolioProps } from '../types';
import { HeaderActions } from './header-actions';
import { PortfolioHeaderRight } from './portfolio-header-right';
import { PortfolioTabs } from './portfolio-tabs';

export function ViewPortfolioHeader({
  portfolio,
}: ViewPortfolioProps) {
  return (
    <div>
      <div className="flex place-content-between place-items-center">
        <HeaderBackdrop height="400px" />
        <div>
          <h1 className={tlsx('text-5xl', 'font-semibold', 'mb-5')}>
            {portfolio.name}
          </h1>

          <p
            className={tlsx(
              'font-[Poppins] dark:text-text-secondary-dark',
              'text-text-secondary-light',
              'mb-6'
            )}
          >
            {portfolio.description}
          </p>

          <div>
            <Tag>Dividend</Tag>
          </div>
        </div>
        <PortfolioHeaderRight portfolio={portfolio} />
      </div>
      <div className="mt-16 flex place-content-between">
        <PortfolioTabs portfolio={portfolio} />
        <HeaderActions />
      </div>
    </div>
  );
}
