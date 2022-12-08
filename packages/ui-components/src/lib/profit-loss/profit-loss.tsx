import { ProfitLossProps } from './profit-loss.props';
import {
  formatCurrency,
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
      ? `${value.toFixed(2)}%`
      : formatCurrency(value);

  return value ? (
    <span className={getColor() + ' ' + 'font-medium'}>
      {value > 0 ? `+${formattedValue}` : formattedValue}
    </span>
  ) : null;
}
