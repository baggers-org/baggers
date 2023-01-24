import {
  MenuDivider,
  Paper,
  TextField,
} from '@baggers/ui-components';
import { SecuritySearch } from '~/components/search-inputs/security-search';
import { useT } from '~/hooks/useT';

export function RecordBuySell() {
  const t = useT('portfolio_tracker');
  return (
    <>
      <div className="my-12">
        <MenuDivider />
      </div>
      <h2 className="text-xl font-bold">
        {t('transaction_info', 'Transaction information')}
      </h2>
      <h3 className="dark:text-text-secondary-dark text-text-secondary-light">
        {t(
          'transaction_info',
          'Enter information about the transaction you would like to record'
        )}
      </h3>
      <Paper className="p-8 mt-6 flex flex-col gap-8">
        <SecuritySearch
          label={t('security_traded', 'Security')}
          required
        />

        <TextField
          label={t('quantity', 'Quantity')}
          name="quantity"
          type="number"
          required
          helperText={t(
            'quantity_helper',
            'Enter the number of units bought/sold'
          )}
        />
        <TextField
          label={t('average_price', 'Average price')}
          isMonetaryInput
          name="price"
          required
          helperText={t(
            'average_price_helper',
            'Enter the average price per unit'
          )}
        />
        <TextField
          label={t('fees', 'Additional fees')}
          name="fees"
          defaultValue={0}
          isMonetaryInput
          helperText={t(
            'average_price_helper',
            'Enter additional fees (if any) that you were charged to make this transaction'
          )}
        />
      </Paper>
    </>
  );
}
