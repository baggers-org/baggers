import { Avatar } from '@baggers/ui-components';
import { formatCurrency } from '@baggers/ui-util';
import { useSubscribe } from 'remix-sse/client';
import { useT } from '~/hooks/useT';
import { tlsx } from '~/util/clsx';
import { ViewPortfolioProps } from '../types';

export function PortfolioHeaderRight({
  portfolio,
}: ViewPortfolioProps) {
  const t = useT('portfolio_tracker');

  const totalValue = useSubscribe(
    `/portfolios/${portfolio._id}/subscribe`,
    'totalValue',
    {
      returnLatestOnly: true,
      deserialize: (raw) => Number(raw),
    }
  );

  return (
    <div className="flex gap-8">
      <div className="flex flex-col place-items-end text-right gap-4">
        <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
          {t('total_value', 'Total value')}
        </span>
        <span className="text-5xl font-bold text-primary-light dark:text-primary-dark">
          {formatCurrency(totalValue || portfolio.totalValue)}
        </span>
      </div>
      <div
        className={tlsx(
          'flex flex-col place-items-center border-x-primary-light',
          'dark-border-r-primary-dark border-x px-4 '
        )}
      >
        <span
          className={tlsx(
            'py-5 px-5',
            'bg-primary-transparent-light dark:bg-primary-transparent-dark',
            'rounded-2xl',
            'text-2xl',
            'font-semibold',
            'mb-2'
          )}
        >
          9832
        </span>
        <span>{t('followers', 'Followers')}</span>
      </div>
      <div className="flex flex-col group place-items-center">
        <Avatar
          src={portfolio.owner.photos?.[0]}
          variant="outlined"
          size="lg"
          alt="portfolio owner"
          fallbackInitials={portfolio.owner.displayName.charAt(0)}
        />
        <span
          className={tlsx(
            'group-hover:text-primary-light',
            'group-hover:dark:text-primary-dark',
            'group-hover:underline',
            'group-hover:cursor-pointer',
            'mt-4'
          )}
        >
          {portfolio.owner.displayName}
        </span>
      </div>
    </div>
  );
}
