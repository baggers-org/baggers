import { Menu as HeadlessMenu } from '@headlessui/react';
import { PropsWithChildren } from 'react';
import { tlsx } from '../../util/clsx';
import { MenuItemsProps } from './types';

export function MenuItems({
  children,
  offsetX,
  offsetY,
  ...rest
}: PropsWithChildren<MenuItemsProps>) {
  return (
    <HeadlessMenu.Items
      static={rest.static}
      as="ul"
      style={{
        left: offsetX,
        top: offsetY,
      }}
      className={tlsx(
        'dark:bg-paper-dark bg-paper-light',
        'rounded-lg',
        'p-1',
        'absolute',
        'z-50',
        '-translate-x-1/4',
        'w-max'
      )}
    >
      {children}
    </HeadlessMenu.Items>
  );
}
