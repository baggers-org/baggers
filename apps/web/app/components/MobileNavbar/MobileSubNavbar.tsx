import { darken, lighten, Tab, Tabs, useTheme } from '@mui/material';
import { useLocation, useNavigate } from '@remix-run/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSubMenu } from '../Sidebar/useSubMenu';
import { MobileProfileBar } from './MobileProfileBar';

export const MobileSubNavbar = () => {
  const subMenu = useSubMenu();
  const theme = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <motion.div
      style={{
        position: 'fixed',
        width: '100%',
        top: 0,
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
              boxShadow: 'rgb(0 0 0 / 10%) -10px 3px 6px',
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
