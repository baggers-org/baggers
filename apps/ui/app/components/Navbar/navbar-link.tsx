import { Link } from '@remix-run/react';
import { NavbarLinkProps } from './types';
import { FaChevronDown } from 'react-icons/fa';
import { clsx } from 'clsx';
import { Menu, MenuItem } from '@baggers/ui-components';
import { useState } from 'react';

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (option.additionalOptions) {
    return (
      <div
        tabIndex={0}
        className={classes}
        onMouseEnter={(event) => setIsMenuOpen(true)}
        onMouseLeave={(event) => setIsMenuOpen(false)}
      >
        <span className="flex place-items-center gap-1 ">
          {option.label}
          <FaChevronDown width={16} />
        </span>
        <Menu open={isMenuOpen} static>
          {option.additionalOptions.map((o) => (
            <MenuItem key={o.to}>
              <Link
                to={o.to || '/'}
                tabIndex={-1}
                className="flex place-content-between gap-4"
              >
                {o?.icon}
                {o.label}
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }

  return (
    <Link to={option?.to || '/'} className={classes}>
      {option.label}
    </Link>
  );
}
