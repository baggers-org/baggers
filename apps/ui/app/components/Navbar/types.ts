import React from 'react';

export type NavbarOption = {
  key: string;
  label: string;
  to?: string;
  icon?: React.ReactElement;
  additionalOptions?: NavbarOption[];
};

export type NavbarProps = {
  options: NavbarOption[];
};
export type NavbarLinkProps = {
  option: NavbarOption;
  active?: boolean;
};
