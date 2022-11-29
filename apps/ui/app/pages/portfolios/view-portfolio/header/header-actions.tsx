import { Button } from '@baggers/ui-components';
import { FaChartPie, FaCog, FaPlusCircle } from 'react-icons/fa';
import { useT } from '~/hooks/useT';

export function HeaderActions() {
  const t = useT('portfolio_tracker');
  return (
    <div className="flex gap-2 pb-2">
      <Button variant="mono" endIcon={<FaChartPie />}>
        {t('add_widget', 'Add widget')}{' '}
      </Button>
      <Button variant="mono" endIcon={<FaPlusCircle />}>
        {t('create_view', 'Create view')}{' '}
      </Button>
      <Button variant="mono" endIcon={<FaCog />}>
        {t('settings', 'Settings')}{' '}
      </Button>
    </div>
  );
}
