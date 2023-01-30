import { Button } from '@baggers/ui-components';
import { useNavigate } from '@remix-run/react';
import { FaFileImport, FaPlusSquare } from 'react-icons/fa';
import { useT } from '~/hooks/useT';
import { tlsx } from '~/util/clsx';

export function CreatedHeader() {
  const t = useT('portfolio_tracker');
  const navigate = useNavigate();
  return (
    <div className="flex place-content-between place-items-center mb-16 ">
      <h1
        className={tlsx(
          'font-bold',
          'uppercase',
          'font-heading',
          'xl:text-3xl text-xl lg:text-2xl'
        )}
      >
        {t('created_portfolios', 'Created portfolios')}
      </h1>

      <div className="flex gap-6">
        <Button
          value="create"
          onClick={() => navigate('/portfolios/new')}
          variant="massive"
          endIcon={<FaPlusSquare />}
        >
          {t('new_portfolio', 'New portfolio')}
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
