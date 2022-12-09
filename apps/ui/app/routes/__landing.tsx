import { Outlet } from '@remix-run/react';
import { AnimatePresence, motion } from 'framer-motion';
import { LogoWhite } from '~/components/logo/logo';
import { ProfileButton } from '~/components/Navbar/navbar-profile';
import { useCurrentUser } from '~/hooks/useCurrentUser';
import { useT } from '~/hooks/useT';
import { LandingBackground } from '~/pages/landing/landing-background';
import { tlsx } from '~/util/clsx';
import AppLayout from './__app';

export default function LandingPageLayout() {
  const user = useCurrentUser();
  const t = useT('common');

  if (user) {
    // Landing page will be the dashboard if the user is authenticated
    // So just show the normal app layout here
    return <AppLayout />;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <nav
            className={tlsx(
              'flex lg:place-content-start place-items-center lg:gap-8 lg:py-3 lg:px-24',
              'bg-primary-light',
              'lg:bg-[transparent]',
              'px-4',
              'py-3',
              'w-full',
              'box-border'
            )}
          >
            <div className="flex gap-4 place-items-center font-[Poppins] font-bold text-2xl text-text-dark">
              <LogoWhite />
              <span className="invisible lg:visible hidden">
                BAGGERS
                <sub className="text-xs font-heading font-light">
                  alpha
                </sub>
              </span>
            </div>
            <div className="flex gap-4 place-items-center ml-auto">
              <button className="px-7 py-2 rounded-2xl bg-[rgba(255,255,255,0.5)] invisible lg:visible">
                {t('sign_up', 'Sign up')}
              </button>
              <ProfileButton />
            </div>
          </nav>
          <LandingBackground
            className={tlsx(
              'invisible lg:visible absolute w-screen h-1/2 top-0 -z-10'
            )}
          />
          <Outlet />
        </motion.main>
      </AnimatePresence>
    </>
  );
}
