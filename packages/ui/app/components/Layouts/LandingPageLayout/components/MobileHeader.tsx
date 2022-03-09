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
import {
  Brightness4Outlined,
  DarkModeOutlined,
  LoginOutlined,
  Menu,
} from '@mui/icons-material';

import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ColorModeContext } from '~/styles';
import { useNavigate } from 'remix';
import Logo from '../../../../../public/svg/logo_dark_50x50.svg';

export const MobileHeader = () => {
  const theme = useTheme();

  const { t } = useTranslation(`landing_page`);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { toggleColorMode } = useContext(ColorModeContext);
  const navigate = useNavigate();

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Logo />
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
          <ListItemButton>
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
            <ListItemText
              primary={t(`login_to_baggers`, `Login to Baggers`)}
              onClick={() => navigate(`/login`)}
            />
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
