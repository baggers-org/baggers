import { PropsWithChildren } from 'react';
import { tlsx } from '~/util/clsx';
import { formatCurrency } from '~/util/format-currency';
import { isProfitLossOrNeutral } from '~/util/is-profit-loss-or-neutral';

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
  const getColor = () => {
    const delta = isProfitLossOrNeutral(value);

    if (delta === `profit`) {
      return 'text-profit-light dark:text-profit-dark';
    }
    if (delta === `loss`) {
      return 'text-loss-light dark:text-loss-dark';
    }
  };

  const formattedValue =
    isPercent && value
      ? `${value.toFixed(2)}%`
      : formatCurrency(value);
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
      {!value && 'N/A'}
      {value ? (
        <span className={getColor() + ' ' + 'font-medium'}>
          {value > 0 ? `+${formattedValue}` : formattedValue}
        </span>
      ) : null}
    </div>
  );
}
