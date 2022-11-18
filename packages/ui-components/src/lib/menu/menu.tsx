import React, { PropsWithChildren } from 'react';
import { Menu as HeadlessMenu } from '@headlessui/react';

import { MenuProps } from './types';
import { MenuTransition } from './menu-transition';
import { MenuItems } from './menu-items';

export function Menu({
  children,
  ...rest
}: PropsWithChildren<MenuProps>) {
  return (
    <HeadlessMenu as="ul" {...rest}>
      {rest.button ? (
        <HeadlessMenu.Button>{rest.button}</HeadlessMenu.Button>
      ) : null}
      <MenuTransition open={rest.open}>
        <MenuItems
          offsetX={rest.offsetX}
          offsetY={rest.offsetY}
          static
        >
          {children}
        </MenuItems>
      </MenuTransition>
    </HeadlessMenu>
  );
}
