import { Paper } from '@baggers/ui-components';
import clsx from 'clsx';
import { Theme, useTheme } from '~/components/theme';
import { useT } from '~/hooks/useT';
import './styles.css';

export function TransactionDate() {
  const t = useT('portfolio_tracker');
  const [theme] = useTheme();

  return (
    <div>
      <h2 className="text-xl font-bold">
        {t('transaction', 'Transaction date')}
      </h2>
      <h3 className="dark:text-text-secondary-dark text-text-secondary-light">
        {t(
          'enter_transaction_date',
          'Enter the transaction date for more accurate analysis, defaults to right now otherwise.'
        )}
      </h3>
      <Paper className="p-8 mt-6">
        <input
          name="date"
          type="datetime-local"
          className={clsx(
            'dark:bg-dark-grey-700 ',
            'bg-neutral-300',
            'focus:outline outline-2 outline-primary-light dark:outline-primary-dark',
            'hover:bg-light-purple-100 dark:hover:bg-primary-transparent-dark',
            'active:outline',
            'rounded-xl',
            'p-3',
            'px-6'
          )}
          style={{
            colorScheme: theme === Theme.DARK ? 'dark' : 'light',
          }}
        />
      </Paper>
    </div>
  );
}
