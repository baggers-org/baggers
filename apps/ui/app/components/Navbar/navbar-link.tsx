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
    'hover:cursor-pointer',
    'hover:opacity-100'
  );

  return (
    <Link to={option?.to || '/'} className={classes}>
      {option.label}
    </Link>
  );
}
