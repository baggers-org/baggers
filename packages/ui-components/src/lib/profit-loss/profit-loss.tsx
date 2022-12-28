import { ProfitLossProps } from './profit-loss.props';
import {
  formatCurrency,
  formatNumber,
  isProfitLossOrNeutral,
} from '@baggers/ui-util';

export function ProfitLoss({ value, isPercent }: ProfitLossProps) {
  if (!value) return <>'N/A'</>;

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
      ? `${formatNumber(value)}%`
      : formatCurrency(value);

  return value ? (
    <span className={getColor()}>
      {value > 0 ? `+${formattedValue}` : formattedValue}
    </span>
  ) : null;
}
