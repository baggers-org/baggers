import {
  FormSectionHeader,
  TextField,
  Select,
} from '@baggers/ui-components';
import { FaList, FaDollarSign, FaPoundSign } from 'react-icons/fa';
import { useT } from '~/hooks/useT';

export function PortfolioDetails() {
  const t = useT('portfolio_tracker');

  return (
    <>
      <FormSectionHeader
        className="rounded-t-xl"
        title={t('portfolio_details', 'Portfolio details')}
        icon={<FaList />}
      />
      <div className="flex flex-col gap-10 p-6 mb-6">
        <TextField
          autoFocus
          name="name"
          label={t('name', 'Name')}
          required
          placeholder={t('portfolio_name', 'Enter portfolio name')}
        />
        <TextField
          name="description"
          label={t('description', 'Description')}
          rows={5}
          placeholder={t(
            'portfolio_description',
            'Enter portfolio description (optional)'
          )}
        />
        <Select
          label={t('currency', 'Currency')}
          required
          helperText={t(
            'currency_helper',
            'Select portfolio base currency - this will be used for FX calculations'
          )}
          placeholder="Select a currency symbol"
          options={[
            {
              id: 'USD',
              label: 'USD',
              renderIcon: () => <FaDollarSign />,
            },
            {
              id: 'GBP',
              label: 'GBP',
              renderIcon: () => <FaPoundSign />,
            },
          ]}
        />
      </div>
    </>
  );
}
