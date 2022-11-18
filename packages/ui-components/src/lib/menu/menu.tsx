import React, { PropsWithChildren } from 'react';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';

import { tlsx } from '../../util/clsx';
import { MenuProps } from './types';

export function Menu({
  children,
  ...rest
}: PropsWithChildren<MenuProps>) {
  return (
    <HeadlessMenu as="ul" {...rest}>
      <Transition
        show={rest.open}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <HeadlessMenu.Items
          static={rest.static}
          as="ul"
          className={tlsx(
            'dark:bg-paper-dark bg-paper-light',
            'rounded-[16px]',
            'p-2',
            'mt-2',
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
      </Transition>
    </HeadlessMenu>
  );
}
