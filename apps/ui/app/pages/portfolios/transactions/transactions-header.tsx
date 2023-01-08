import { Button } from '@baggers/ui-components';
import { PrefetchPageLinks, useNavigate } from '@remix-run/react';
import { usePortfolio } from '~/hooks/usePortfolio';
import { useT } from '~/hooks/useT';

export function TransactionsHeader() {
  const t = useT('portfolio_tracker');
  const { _id } = usePortfolio();
  const navigate = useNavigate();

  return (
    <div>
      <PrefetchPageLinks
        page={`/portfolios/${_id}/transactions/record`}
      />
      <Button
        onClick={() =>
          navigate(`/portfolios/${_id}/transactions/record`)
        }
      >
        {t('record_transaction', 'Record transaction')}
      </Button>
    </div>
  );
}
