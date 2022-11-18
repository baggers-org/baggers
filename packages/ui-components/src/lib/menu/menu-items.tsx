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
        'rounded-[16px]',
        'p-2',
        'text-text-secondary-dark',
        'absolute',
        'z-50',
        'border',
        'border-3',
        '-translate-x-1/4',
        'border-primary-light dark:border-primary-dark',
        'w-max'
      )}
    >
      {children}
    </HeadlessMenu.Items>
  );
}
