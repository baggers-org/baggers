import { formatCurrency } from '@baggers/ui-util';
import { useTranslation } from 'react-i18next';
import { PortfolioCardProps } from './portfolio-card';

export function PortfolioCardTotalValue({
  portfolio,
}: PortfolioCardProps) {
  const { t } = useTranslation();
  return (
    <div className="font-[Helvetica] grid">
      <span className="text-sm font-thin">
        {t('total_value', 'Total value')}
      </span>
      <span className="text-4xl font-bold">
        {formatCurrency(portfolio.totalValue)}
      </span>
    </div>
  );
}
