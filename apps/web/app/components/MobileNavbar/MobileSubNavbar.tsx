import { darken, lighten, Tab, Tabs, useTheme } from '@mui/material';
import { useLocation, useNavigate } from '@remix-run/react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSubMenu } from '../Sidebar/useSubMenu';
import { MobileProfileBar } from './MobileProfileBar';

const variants = {
  hidden: {
    opacity: 0,
    top: -100,
  },
  visible: {
    opacity: 1,
    top: 0,
  },
};
export const MobileSubNavbar = () => {
  const subMenu = useSubMenu();
  const theme = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [lastScroll, setLastScroll] = useState(0);

  const [hideNavbar, setHideNavbar] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        if (window.scrollY > lastScroll) {
          setHideNavbar(true);
        } else {
          setHideNavbar(false);
        }

        setLastScroll(window.scrollY);
      };
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [lastScroll]);

  return (
    <motion.div
      variants={variants}
      animate={hideNavbar ? 'hidden' : 'visible'}
      style={{
        position: 'fixed',
        width: '100%',
        zIndex: 99,
      }}
    >
      <MobileProfileBar />
      <AnimatePresence>
        {subMenu?.options.length ? (
          <motion.div
            animate={{ opacity: 1 }}
            style={{
              zIndex: 99,
              boxShadow: 'rgb(0 0 0 / 4%) -10px 3px 6px',
              borderTop: `1px solid ${lighten(theme.palette.divider, 0.3)}`,
              background:
                theme.palette.mode === 'light'
                  ? darken(theme.palette.background.paper, 0.02)
                  : '#232323',
              width: '100%',
            }}
          >
            <Tabs
              variant="scrollable"
              scrollButtons
              value={pathname}
              allowScrollButtonsMobile
            >
              {subMenu?.options
                // Filter out dividers which are represented by a null object in the options
                .filter((o) => !!o.href)
                .map((option) => (
                  <Tab
                    label={option.label}
                    value={option.href}
                    onClick={() => navigate(option.href || '')}
                  />
                ))}
            </Tabs>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};
