import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import {
  Brightness4Outlined,
  DarkModeOutlined,
  LoginOutlined,
  Menu,
} from '@mui/icons-material';

import { useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { ColorModeContext } from '@/components';
import LogoDarkTheme from '../../../../../public/Logo/logo_dark_50x50.svg';

export const MobileHeader = () => {
  const { push } = useRouter();
  const theme = useTheme();

  const { t } = useTranslation(`landing_page`);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleColorMode } = useContext(ColorModeContext);

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2}>
        <LogoDarkTheme />
        <Typography variant="h6" color="white" fontFamily="Archivo Black">
          BAGGERS
        </Typography>
      </Stack>
      <IconButton
        sx={{ ml: `auto`, color: `white` }}
        onClick={() => setIsMenuOpen((o) => !o)}
      >
        <Menu />
      </IconButton>
      <Drawer
        open={isMenuOpen}
        anchor="right"
        onClose={() => setIsMenuOpen(false)}
      >
        <List>
          <ListItemButton onClick={() => push(`/login`)}>
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
            <ListItemText primary={t(`login_to_baggers`, `Login to Baggers`)} />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={toggleColorMode}>
            <ListItemIcon>
              {theme.palette.mode === `dark` ? (
                <Brightness4Outlined />
              ) : (
                <DarkModeOutlined />
              )}
            </ListItemIcon>
            <ListItemText>
              {theme.palette.mode === `dark`
                ? t(`switch_to_light_theme`, `Switch to light theme`)
                : t(`switch_to_dark_theme`, `Switch to dark theme`)}
            </ListItemText>
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};
