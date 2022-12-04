import { clsx } from 'clsx';
import { NavbarProps } from './types';
import { NavbarLink } from './navbar-link';
import { useActiveNavbarTab } from './useActiveNavbarTab';
import { NavbarSearch } from './navbar-search';
import { ProfileButton } from './navbar-profile';
import { useTransition } from '@remix-run/react';
import { LogoPrimary } from '../logo/logo';
import { NabvarProgress } from './navbar-progress';

export function Navbar({ options }: NavbarProps) {
  const activeTab = useActiveNavbarTab();

  const { state } = useTransition();

  return (
    <nav
      className={clsx(
        'px-24',
        'py-3',
        'flex',
        'bg-gradient-to-b',
        'bg-background-light',
        'dark:bg-background-dark',
        'place-content-start',
        'place-items-center',
        'w-full',
        'gap-24',
        'fixed',
        'z-40',
        'border-b',
        'border-b-[rgba(96,96,96,0.14)]',
        'dark:border-b-[rgba(96,96,96,0.60)]'
      )}
    >
      <div className="flex gap-4 place-items-center font-[Poppins] font-bold text-2xl ">
        <LogoPrimary />
        BAGGERS
      </div>

      <div className="w-max flex gap-16">
        {options.map((option) => (
          <NavbarLink
            key={option.key}
            option={option}
            active={activeTab === option.key}
          />
        ))}
      </div>
      <div className="mr-3 ml-auto flex gap-4">
        <NavbarSearch />
        <ProfileButton />
      </div>
      {state === 'submitting' ? <NabvarProgress /> : null}
    </nav>
  );
}
