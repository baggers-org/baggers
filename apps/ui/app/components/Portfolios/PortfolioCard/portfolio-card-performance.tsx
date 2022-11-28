import { tlsx } from '@baggers/ui-components/src/util/clsx';
import { useTranslation } from 'react-i18next';
import { PortfolioCardProps } from './portfolio-card';
import { PortfolioCardPrice } from './portfolio-card-price';

export function PortfolioCardPerformance({
  portfolio,
}: PortfolioCardProps) {
  const { t } = useTranslation();
  return (
    <div
      className={tlsx(
        'place-self-end grid gap-4 px-2',
        'grid-cols-3',
        'w-full'
      )}
    >
      <PortfolioCardPrice
        label={t('today', 'Today')}
        isPercent
        value={12.4}
      />
      <PortfolioCardPrice
        label={t('ytd', 'YTD')}
        isPercent
        value={17.3}
      />
      <PortfolioCardPrice
        label={t('all_time', 'All time')}
        isPercent
        value={8.4}
      />
    </div>
  );
}
