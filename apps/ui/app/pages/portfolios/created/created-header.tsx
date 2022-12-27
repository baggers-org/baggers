import { Button } from '@baggers/ui-components';
import { FaFileImport, FaPlusSquare } from 'react-icons/fa';
import { HeaderBackdrop } from '~/components/header-backdrop';
import { useT } from '~/hooks/useT';
import { tlsx } from '~/util/clsx';

export function CreatedHeader() {
  const t = useT('portfolio_tracker');
  return (
    <div className="flex place-content-between place-items-center mb-32 ">
      <HeaderBackdrop />
      <h1
        className={tlsx(
          'font-bold',
          'xl:text-3xl text-xl lg:text-2xl'
        )}
      >
        {t('created_portfolios', 'Created portfolios')}
      </h1>

      <div className="flex gap-6">
        <Button
          type="submit"
          name="intent"
          value="create"
          variant="massive"
          endIcon={<FaPlusSquare />}
        >
          {t('create_portfolio', 'Create portfolio')}
        </Button>

        <Button
          type="submit"
          name="intent"
          value="import"
          variant="massive"
          endIcon={<FaFileImport />}
        >
          {t('import_from_broker', 'Import from broker')}
        </Button>
      </div>
    </div>
  );
}
