import {
  Box,
  Divider,
  IconButton,
  lighten,
  List,
  ListItemButton,
  useTheme,
} from '@mui/material';

import { motion } from 'framer-motion';

import { useMenuOptions } from './useMenuOptions';
import Logo from '../../../public/svg/logo.svg';

import { useNavigate } from '@remix-run/react';
import { useActiveTab } from '~/hooks';
import { ProfileButton } from '../ProfileButton';
import { ThemeToggle } from '../ThemeToggle';
import { useSidebarContext } from './Sidebar.context';
import { ChevronLeft, ChevronRight } from 'tabler-icons-react';
import { SubSidebar } from './SubSidebar';
import { useSubMenu } from './useSubMenu';
import { ColoredIcon } from '../ColoredIcon';

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
  const { isExpanded: expanded, setIsExpanded } = useSidebarContext();
  const subMenu = useSubMenu();

  const isExpanded = expanded && !subMenu;

  return (
    <>
      <motion.div
        initial={false}
        animate={{ width: isExpanded ? expandedWidth : collapsedWidth }}
        style={{ width: isExpanded ? expandedWidth : collapsedWidth }}
      >
        <motion.div
          initial={false}
          animate={{ width: isExpanded ? expandedWidth : collapsedWidth }}
          style={{
            gridTemplateRows: '75px  auto 75px',
            position: 'fixed',
            justifyContent: 'center',

            background:
              theme.palette.mode === 'light'
                ? theme.palette.background.paper
                : '#232323',
            width: isExpanded ? expandedWidth : collapsedWidth,
            boxShadow: theme.shadows[3],
            gap: '20px',
            minHeight: '100%',
            zIndex: 99,
            display: 'grid',
          }}
        >
          <Box display="grid" width="100%" justifyItems="center" mt={2} mb={3}>
            <Logo />
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
            onClick={() => setIsExpanded?.((e) => !e)}
            color="primary"
            sx={{
              justifySelf: 'center',
              width: 32,
              height: 32,
              position: 'fixed',
              top: 100,
              transform: isExpanded ? 'translateX(300%)' : 'translateX(150%)',
              fontSize: 22,
              display: subMenu ? 'none' : 'flex',
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
                onClick={() => navigate(option.href || '')}
                sx={{ mt: 4 }}
              >
                <ColoredIcon icon={option.icon} />
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
            alignSelf="end"
            justifyContent="center"
            display="grid"
          >
            <ThemeToggle />
            <ProfileButton />
          </Box>
        </motion.div>
      </motion.div>
      <SubSidebar />
    </>
  );
};
