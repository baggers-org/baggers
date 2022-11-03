import { Tab, Tabs, useTheme } from '@mui/material';
import { useNavigate } from '@remix-run/react';
import { motion } from 'framer-motion';
import React from 'react';
import { useActiveTab } from 'apps/ui/app/hooks';
import { useMenuOptions } from '../Sidebar/useMenuOptions';

export const MobileNavbar: React.FC = () => {
  const options = useMenuOptions();
  const navigate = useNavigate();
  const theme = useTheme();
  const activeTab = useActiveTab();

  return (
    <motion.nav
      animate={{ bottom: 0 }}
      style={{
        boxShadow: 'rgb(0 0 0 / 4%) 4px -10px 6px',
        background:
          theme.palette.mode === 'light'
            ? theme.palette.background.paper
            : '#232323',
      }}
      initial={{
        position: 'fixed',
        bottom: -100,
        zIndex: 99,
        width: '100%',
      }}
    >
      {
        <Tabs value={activeTab} variant="fullWidth">
          {options.map((option) => (
            <Tab
              onClick={() => navigate(option.href || '')}
              label={option.label}
              value={option.value}
              icon={option.icon}
            />
          ))}
        </Tabs>
      }
    </motion.nav>
  );
};
