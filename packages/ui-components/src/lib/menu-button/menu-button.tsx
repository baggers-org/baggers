import { Menu } from '@headlessui/react';
import { ChevronDown } from 'tabler-icons-react';
import { MenuButtonProps } from './types';

export function MenuButton({
  label,
  buttonClassName,
}: MenuButtonProps) {
  return (
    <Menu>
      <Menu.Button className={buttonClassName}>
        {label}
        <ChevronDown size={16} />
      </Menu.Button>
    </Menu>
  );
}
