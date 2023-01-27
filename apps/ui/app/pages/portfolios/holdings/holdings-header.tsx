import { Button } from '@baggers/ui-components';
import { useT } from '~/hooks/useT';

export function HoldingsHeader() {
  const t = useT('portfolio_tracker');
  return (
    <div>
      <Button disabled>{t('add_holding', 'Add holding')}</Button>
    </div>
  );
}
