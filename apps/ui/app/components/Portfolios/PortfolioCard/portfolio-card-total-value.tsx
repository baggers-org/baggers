import { useTranslation } from 'react-i18next';
import { formatCurrency } from '~/util/format-currency';
import { PortfolioCardProps } from './portfolio-card';

export function PortfolioCardTotalValue({
  portfolio,
}: PortfolioCardProps) {
  const { t } = useTranslation();
  return (
    <div className="place-self-center font-[Helvetica] grid place-items-center">
      <span className="text-sm font-thin">
        {t('total_value', 'Total value')}
      </span>
      <span className="text-4xl font-bold">
        {formatCurrency(portfolio.totalValue)}
      </span>
    </div>
  );
}
