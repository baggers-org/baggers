import {
  Avatar,
  Box,
  Divider,
  IconButton,
  lighten,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';

import { motion } from 'framer-motion';

import { useMenuOptions } from './useMenuOptions';
import LogoBlack from '../../../public/svg/logo_black_small.svg';
import LogoWhite from '../../../public/svg/logo_white_small.svg';

import { useNavigate } from '@remix-run/react';
import { useActiveTab } from '~/hooks';
import { ProfileButton } from '../ProfileButton';
import { ThemeToggle } from '../ThemeToggle';
import { useSidebarContext } from './Sidebar.context';
import { ChevronLeft, ChevronRight } from 'tabler-icons-react';

const expandedWidth = 200;
const collapsedWidth = 100;

const variants = {
  minimized: {
    opacity: 0,
    display: 'none',
  },
  expanded: {
    opacity: 1,
    transition: {
      delay: 0.1,
    },
  },
};
export const Sidebar = () => {
  const theme = useTheme();

  const options = useMenuOptions();
  const navigate = useNavigate();

  const activeTab = useActiveTab();
  const { isExpanded, setIsExpanded } = useSidebarContext();

  return (
    <motion.div
      initial={false}
      animate={{ width: isExpanded ? expandedWidth : collapsedWidth }}
      style={{
        width: '100%',
      }}
    >
      <motion.div
        initial={false}
        animate={{ width: isExpanded ? expandedWidth : collapsedWidth }}
        style={{
          gridTemplateRows: '75px 48px auto 75px',
          position: 'fixed',
          justifyContent: 'center',

          background:
            theme.palette.mode === 'light'
              ? theme.palette.background.paper
              : '#232323',
          width: isExpanded ? expandedWidth : collapsedWidth,
          boxShadow: theme.shadows[0],
          borderRadius: '0 16px 0 0',
          gap: '20px',
          minHeight: '100%',
          zIndex: 99,
          display: 'grid',
        }}
      >
        <Box display="grid" width="100%" justifyItems="center" mt={2} mb={3}>
          {theme.palette.mode === 'light' ? <LogoBlack /> : <LogoWhite />}
          <motion.div
            style={{ fontFamily: 'Archivo Black', fontSize: '18px' }}
            animate={isExpanded ? 'expanded' : 'minimized'}
            variants={variants}
          >
            BAGGERS
          </motion.div>
          <Divider />
        </Box>
        <IconButton
          onClick={() => setIsExpanded((e) => !e)}
          color="primary"
          sx={{
            justifySelf: 'center',
            width: 32,
            height: 32,
            transform: isExpanded ? 'translateX(300%)' : 'translateX(150%)',
            fontSize: 22,
            background: lighten(theme.palette.primary.light, 0.5),
            color: theme.palette.primary.dark,
          }}
        >
          {isExpanded ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
        <List sx={{ width: '100%' }}>
          {options.map((option) => (
            <ListItemButton
              selected={activeTab === option.value}
              onClick={() => navigate(option.href)}
              sx={{ mt: 4 }}
            >
              <Avatar
                variant="rounded"
                sx={{
                  width: 28,
                  height: 28,

                  color: theme.palette.primary.dark,
                  bgcolor: lighten(theme.palette.primary.light, 0.5),
                }}
              >
                {option.icon}
              </Avatar>
              <motion.li
                style={{ marginLeft: 16, padding: 4 }}
                animate={isExpanded ? 'expanded' : 'minimized'}
                variants={variants}
              >
                {option.label}
              </motion.li>
            </ListItemButton>
          ))}
        </List>
        <Box
          justifySelf="center"
          pb={9}
          alignSelf="center"
          justifyContent="center"
          display="grid"
        >
          <ThemeToggle />
          <ProfileButton />
        </Box>
      </motion.div>
    </motion.div>
  );
};
