import { clsx } from 'clsx';
import { NavbarProps } from './types';
import { motion } from 'framer-motion';
import { NavbarLink } from './navbar-link';
import { useActiveNavbarTab } from './useActiveNavbarTab';
import Logo from '../../../public/logo.svg';
import { NavbarSearch } from './navbar-search';
import { ProfileButton } from './navbar-profile';
import { useTransition } from '@remix-run/react';

export function Navbar({ options }: NavbarProps) {
  const activeTab = useActiveNavbarTab();

  const { state } = useTransition();

  return (
    <nav
      className={clsx(
        'px-12',
        'py-3',
        'flex',
        'bg-gradient-to-b',
        'bg-background-light',
        'dark:bg-background-dark',
        'place-content-between',
        'place-items-center',
        'w-full',
        'fixed',
        'z-40',
        'border-b',
        'border-b-[rgba(96,96,96,0.14)]',
        'dark:border-b-[rgba(96,96,96,0.60)]'
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
      {state === 'submitting' ? (
        <svg className="w-full absolute h-1 z-50 -left-1 bottom-0">
          <motion.line
            style={{
              stroke: 'rgb(154,106,255)',
              strokeWidth: '100%',
            }}
            initial={{
              x1: '0',
              y1: '0',
              x2: '0',
              y2: '0',
            }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              duration: 1,
            }}
            animate={{
              x1: ['0', '0', '100%'],
              y1: '0',
              x2: ['0', '100%', '100%'],
              y2: '0',
            }}
          />
          <motion.line
            style={{
              stroke: 'rgba(154,106,255,0.3)',
              strokeWidth: '100%',
            }}
            initial={{
              x1: '0',
              y1: '0',
              x2: '100%',
              y2: '0',
            }}
          />
        </svg>
      ) : null}
    </nav>
  );
}
