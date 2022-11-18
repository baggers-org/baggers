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
        'bg-gradient-to-b',
        'from-[rgba(36,97,247,0.2)] to-[rgba(116,47,246,0.3)]',
        'dark:from-[rgba(84,116,254,0.6)]',
        'dark:to-[rgba(154,106,255,0.5)]',
        'rounded-[65px]',
        'p-5',
        'my-4',
        'flex',
        'place-content-between',
        'place-items-center',
        'absolute',
        'w-full',
        'h-24',
        'ml-auto',
        'mr-auto'
      )}
    >
      <div className="h-max font-extrabold grid place-content-center place-items-center ml-2">
        <div className="w-10 h-10">
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
      <ProfileButton />
    </nav>
  );
}
