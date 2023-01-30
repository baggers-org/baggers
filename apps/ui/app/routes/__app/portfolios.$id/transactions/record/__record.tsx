import { Button, MenuDivider } from '@baggers/ui-components';
import { Outlet } from '@remix-run/react';
import { useT } from '~/hooks/useT';
import { TransactionDate } from '~/pages/portfolios/record-transaction/transaction-date';

export default function RecordLayout() {
  const t = useT('portfolio_tracker');
  return (
    <>
      <Outlet />

      <div className="my-12">
        <MenuDivider />
      </div>
      <TransactionDate />

      <div className="flex place-content-end mt-16">
        <Button variant="grey" type="reset">
          {t('cancel', 'Cancel')}
        </Button>
        <Button type="submit">
          {t('record_transaction', 'Record transaction')}
        </Button>
      </div>
    </>
  );
}
