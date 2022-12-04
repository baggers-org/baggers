import { Outlet } from '@remix-run/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from '~/components/Navbar';
import { useNavbarOptions } from '~/hooks/useNavbarOptions';

export default function AppLayout() {
  return (
    <>
      <Navbar options={useNavbarOptions()} />
      <div className="pt-36 px-24">
        <AnimatePresence mode="wait">
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </div>
    </>
  );
}
