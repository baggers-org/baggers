import { tlsx } from '../../util/clsx';
import { Menu as HeadlessMenu } from '@headlessui/react';
import { PropsWithChildren } from 'react';
import { MenuItemProps } from './types';

export function MenuItem({
  children,
  ...rest
}: PropsWithChildren<MenuItemProps>) {
  return (
    <HeadlessMenu.Item
      as="li"
      className={tlsx(
        'dark:bg-paper-dark bg-paper-light',
        'px-6 py-2',
        'focus:drop-shadow-none',
        'focus:outline-none',
        'w-full',
        'flex',
        'place-items-center',
        'place-content-baseline',
        'gap-7',
        'hover:cursor-pointer',
        'dark:hover:text-text-dark',
        'focus:outline-primary-light',
        'focus:dark:outline-primary-dark',
        'hover:outline-paper-light',
        'hover:dark:outline-paper-dark',
        'dark:text-text-secondary-dark',
        'font-[400]',
        'hover:bg-primary-transparent-light dark:hover:bg-primary-transparent-dark',
        rest.textSecondary
          ? 'text-secondary-light dark:text-secondary-dark'
          : ''
      )}
      {...rest}
    >
      {children}
    </HeadlessMenu.Item>
  );
}
