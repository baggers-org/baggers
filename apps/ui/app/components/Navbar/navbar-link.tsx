import * as React from 'react';
import { Link } from '@remix-run/react';
import { NavbarLinkProps } from './types';
import { clsx } from 'clsx';

export function NavbarLink({ option, active }: NavbarLinkProps) {
  const classes = clsx(
    !active && 'opacity-50',
    'text-primary-light',
    'dark:text-text-dark',
    'font-medium',
    'text-md',
    'hover:underline',
    'hover:opacity-100'
  );
  if (option.additionalOptions || !option.to) {
    return <div className={classes}>{option.label}</div>;
  }
  return (
    <Link to={option?.to} className={classes}>
      {option.label}
    </Link>
  );
}
