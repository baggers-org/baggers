import { Button } from '@baggers/ui-components';
import { FaCog } from 'react-icons/fa';
import { useT } from '~/hooks/useT';

export function HeaderActions() {
  const t = useT('portfolio_tracker');

  return (
    <div className="flex gap-2 pb-2">
      <Button variant="mono" endIcon={<FaCog />}>
        {t('settings', 'Settings')}{' '}
      </Button>
    </div>
  );
}
