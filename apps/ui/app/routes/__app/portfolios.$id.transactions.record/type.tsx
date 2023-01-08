import { Step, MenuDivider } from '@baggers/ui-components';
import { Outlet, useLocation } from '@remix-run/react';
import { useT } from '~/hooks/useT';
import { SelectTransactionType } from '~/pages/portfolios/record-transaction/select-transaction-type';

export default function RecordTransactionTypeLayout() {
  const { pathname } = useLocation();
  const t = useT('portfolio_tracker');
  return (
    <>
      <Step
        title={t(
          'select_transaction_type',
          'Select transaction type'
        )}
        number={1}
        active={pathname.endsWith('/record')}
        complete={!pathname.endsWith('/record')}
        subtitle={t(
          'select_transaction_type_subtitle',
          'Select the transaction type from the dropdown below to begin'
        )}
      />
      <SelectTransactionType />
      <div className="my-12">
        <MenuDivider />
      </div>
      <Outlet />
    </>
  );
}
