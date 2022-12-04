import { FaEllipsisV } from 'react-icons/fa';
import { Menu, MenuDivider, MenuItem } from '../menu';
import { DataTableMenuProps } from './data-table-menu.props';

export function DataTableMenu<D>({ column }: DataTableMenuProps<D>) {
  return (
    <Menu button={<FaEllipsisV />}>
      <MenuItem onClick={column.getToggleVisibilityHandler()}>
        Hide
      </MenuItem>
      <MenuDivider />
      <MenuItem onClick={() => column.pin('left')}>
        Pin to left
      </MenuItem>
      <MenuItem onClick={() => column.pin('right')}>
        Pin to right
      </MenuItem>
    </Menu>
  );
}
