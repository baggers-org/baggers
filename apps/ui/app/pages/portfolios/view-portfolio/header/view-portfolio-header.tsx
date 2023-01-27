import { Tag } from '@baggers/ui-components';
import { tlsx } from '~/util/clsx';
import { ViewPortfolioProps } from '../types';
import { HeaderActions } from './header-actions';
import { PortfolioHeaderRight } from './portfolio-header-right';
import { PortfolioTabs } from './portfolio-tabs';

export function ViewPortfolioHeader({
  portfolio,
}: ViewPortfolioProps) {
  return (
    <div
      className={tlsx(
        'border-b',
        'border-b-[rgba(96,96,96,0.14)]',
        'dark:border-b-[rgba(96,96,96,0.60)]',
        '-my-16',
        '-mx-24',
        'pt-6',
        'px-24',
        'mb-12'
      )}
    >
      <div className="flex place-content-between place-items-center">
        <div>
          <h1 className={tlsx('text-5xl', 'font-semibold', 'mb-5')}>
            {portfolio.name}
          </h1>

          <p
            className={tlsx(
              'font-[Poppins] dark:text-text-secondary-dark',
              'text-text-secondary-light',
              'mb-6',
              'h-8',
              'max'
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
      <div className="mt-16 flex place-content-between place-items-end">
        <PortfolioTabs portfolio={portfolio} />
        <HeaderActions />
      </div>
    </div>
  );
}
