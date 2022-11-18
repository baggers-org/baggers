import { tlsx } from '../../util/clsx';
import { Menu as HeadlessMenu } from '@headlessui/react';
import { PropsWithChildren } from 'react';

export function MenuItem({ children }: PropsWithChildren) {
  return (
    <HeadlessMenu.Item
      as="li"
      className={tlsx(
        'dark:bg-paper-dark bg-paper-light',
        'px-6 py-2',
        'focus:drop-shadow-none',
        'focus:outline-none',

        'focus:outline-primary-light',
        'focus:dark:outline-primary-dark',
        'hover:outline-paper-light',
        'hover:dark:outline-paper-dark',
        'font-[400]',
        'hover:bg-primary-transparent-light dark:hover:bg-primary-transparent-dark',
        'rounded-[15px]'
      )}
    >
      {children}
    </HeadlessMenu.Item>
  );
}
