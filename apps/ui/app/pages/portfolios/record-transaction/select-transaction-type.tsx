import { Select } from '@baggers/ui-components';
import {
  useLocation,
  useNavigate,
  useParams,
} from '@remix-run/react';
import { useT } from '~/hooks/useT';
import { useTransactionTypes } from './useTransactionTypes';

export function SelectTransactionType() {
  const t = useT('portfolio_tracker');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const activeStep = pathname.split('/').pop();

  const types = useTransactionTypes();

  return (
    <Select
      name="subType"
      defaultValue={activeStep}
      label={t('select_transaction_type', 'Transaction type')}
      helperText={t(
        'select_transaction_type_subtitle',
        'Select the transaction type from the dropdown below to begin'
      )}
      placeholder={t(
        'transaction_type_dropdown_placeholder',
        'Select transaction type'
      )}
      onChange={(val) =>
        navigate(
          `/portfolios/${id}/transactions/record/${val
            .toString()
            .toLowerCase()}`
        )
      }
      options={types}
    />
  );
}
