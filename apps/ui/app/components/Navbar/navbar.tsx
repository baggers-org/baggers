import { clsx } from 'clsx';
import { NavbarProps } from './types';
import { NavbarLink } from './navbar-link';
import { useActiveNavbarTab } from './useActiveNavbarTab';
import Logo from '../../../public/logo.svg';
import { NavbarSearch } from './navbar-search';
import { ProfileButton } from './navbar-profile';

export function Navbar({ options }: NavbarProps) {
  const activeTab = useActiveNavbarTab();

  return (
    <nav
      className={clsx(
        'px-12',
        'py-3',
        'mb-8',
        'flex',
        'bg-gradient-to-b',
        'bg-background-light',
        'dark:bg-background-dark',
        'place-content-between',
        'place-items-center',
        'w-full',
        'fixed',
        'z-50',
        'box-border',
        'border-b',
        'border-b-[rgba(96,96,96,0.14)]',
        'dark:border-b-[rgba(96,96,96,0.60)]',
        'ml-auto',
        'mr-auto'
      )}
    >
      <div className="flex gap-4 place-items-center font-[Poppins] font-bold text-2xl ">
        <div className="w-12 h-12 text-primary-light dark:text-primary-dark">
          <Logo />
        </div>
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
      <NavbarSearch />
      <div className="mr-3">
        <ProfileButton />
      </div>
    </nav>
  );
}
