import { FormSectionHeader, Paper } from '@baggers/ui-components';
import clsx from 'clsx';
import { FaCalendar } from 'react-icons/fa';
import { Theme, useTheme } from '~/components/theme';
import { useT } from '~/hooks/useT';
import './styles.css';

export function TransactionDate() {
  const t = useT('portfolio_tracker');
  const [theme] = useTheme();

  return (
    <Paper>
      <FormSectionHeader
        title={t('transaction_date', 'Transaction date')}
        icon={<FaCalendar />}
      />
      <div className="p-8">
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
      </div>
    </Paper>
  );
}
