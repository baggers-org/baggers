import { Select } from '@baggers/ui-components';
import { useLocation, useNavigate } from '@remix-run/react';
import { IoSwapHorizontal } from 'react-icons/io5';
import { useT } from '~/hooks/useT';

export function SelectTransactionType() {
  const t = useT('portfolio_tracker');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeStep = pathname.split('/').pop();
  return (
    <Select
      defaultValue={activeStep}
      placeholder={t(
        'transaction_type_dropdown_placeholder',
        'Select transaction type'
      )}
      onChange={(val) => navigate(`${pathname}/${val}`)}
      options={[
        {
          id: 'trade',
          label: 'Trade',
          renderIcon: () => <IoSwapHorizontal />,
        },
      ]}
    ></Select>
  );
}
