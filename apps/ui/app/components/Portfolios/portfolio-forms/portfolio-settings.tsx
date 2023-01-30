import { FormSectionHeader } from '@baggers/ui-components';
import { FaCog } from 'react-icons/fa';
import { useT } from '~/hooks/useT';

export function PortfolioSettings() {
  const t = useT('portfolio_tracker');
  return (
    <>
      <FormSectionHeader
        className="-mr-12"
        title={t('portfolio_settings', 'Portfolio settings')}
        icon={<FaCog />}
      />

      <div className="flex flex-col gap-10 p-6"></div>
    </>
  );
}
