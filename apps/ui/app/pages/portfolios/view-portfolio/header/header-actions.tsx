import {
  Button,
  Menu,
  MenuDivider,
  MenuItem,
} from '@baggers/ui-components';
import { useNavigate } from '@remix-run/react';
import {
  FaCog,
  FaFolderPlus,
  FaPlus,
  FaPlusSquare,
} from 'react-icons/fa';
import { useCurrentPortfolioView } from '~/hooks/useCurrentPortfolioView';
import { usePortfolio } from '~/hooks/usePortfolio';
import { useT } from '~/hooks/useT';

export function HeaderActions() {
  const t = useT('portfolio_tracker');

  const view = useCurrentPortfolioView();
  const { _id } = usePortfolio();
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 pb-2">
      <Menu
        button={
          <Button endIcon={<FaPlus />} className="p-0">
            {t('add', 'New')}
          </Button>
        }
      >
        <MenuItem>
          <FaPlusSquare />
          {`New panel in '${view.toLocaleUpperCase()}'`}
        </MenuItem>
        <MenuItem>
          <FaFolderPlus />
          {`New view`}
        </MenuItem>
        <MenuDivider />
        <MenuItem
          onClick={() => navigate(`/portfolios/${_id}/holdings/add`)}
        >
          <FaPlus />
          {`New holding`}
        </MenuItem>
        <MenuItem>
          <FaPlus />
          {`New transaction`}
        </MenuItem>
      </Menu>
      <Button variant="mono" endIcon={<FaCog />}>
        {t('settings', 'Settings')}{' '}
      </Button>
    </div>
  );
}
