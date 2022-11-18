import React from 'react';

export type MenuProps = {
  open?: boolean;
  static?: boolean;
  button?: React.ReactElement;
  offsetX?: number;
  offsetY?: number;
};

export type MenuTransitionProps = {
  open?: boolean;
};

export type MenuItemProps = React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>;
export type MenuItemsProps = {
  static?: boolean;
  offsetX?: number;
  offsetY?: number;
};
