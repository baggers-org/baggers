import {
  Button,
  Menu,
  MenuDivider,
  MenuItem,
} from '@baggers/ui-components';
import {
  FaCog,
  FaFolderPlus,
  FaPlus,
  FaPlusSquare,
} from 'react-icons/fa';
import { useCurrentPortfolioView } from '~/hooks/useCurrentPortfolioView';
import { useT } from '~/hooks/useT';

export function HeaderActions() {
  const t = useT('portfolio_tracker');

  const view = useCurrentPortfolioView();

  return (
    <div className="flex gap-2 pb-2">
      <Menu
        button={
          <Button variant="mono" endIcon={<FaPlus />}>
            {t('add', 'New ...')}
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
        <MenuItem>
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
