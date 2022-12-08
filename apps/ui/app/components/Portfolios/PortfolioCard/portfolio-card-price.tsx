import { ProfitLoss } from '@baggers/ui-components';
import { PropsWithChildren } from 'react';
import { tlsx } from '~/util/clsx';

export interface PortfolioCardPriceProps {
  label?: string | null;
  value: number;
  isPercent?: boolean;
}
export function PortfolioCardPrice({
  label,
  value,
  isPercent,
}: PropsWithChildren<PortfolioCardPriceProps>) {
  return (
    <div
      className={tlsx(
        'dark:bg-[rgba(26,32,48,0.91)]',
        'bg-paper-light',
        'grid',
        'place-content-center',
        'place-items-center',
        'rounded-[9px]',
        'py-4'
      )}
    >
      <span className="text-xs">{label}</span>
      <ProfitLoss value={value} isPercent={isPercent} />
    </div>
  );
}
