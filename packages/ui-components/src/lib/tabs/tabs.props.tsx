import { PropsWithChildren } from 'react';
import { HTMLProps } from '../../util/html-props';

export type TabsProps = PropsWithChildren<{
  edittable?: boolean;
  selectedIndex?: number;
  defaultIndex?: number;
}> &
  HTMLProps<HTMLButtonElement>;
