import {
  LoginOutlined,
  Brightness4Outlined,
  DarkModeOutlined,
  Menu,
} from '@mui/icons-material';
import {
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
} from '@mui/material';
import { useNavigate } from '@remix-run/react';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrentUser } from '~/hooks/useCurrentUser';
import { ColorModeContext } from '~/styles';

export const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { toggleColorMode } = useContext(ColorModeContext);

  const user = useCurrentUser();

  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <IconButton
        sx={{
          color: `white`,
        }}
        onClick={() => setIsMenuOpen((o) => !o)}
      >
        <Menu />
      </IconButton>
      <Drawer
        open={isMenuOpen}
        anchor="left"
        onClose={() => setIsMenuOpen(false)}
      >
        <List>
          <ListItemButton>
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
            <ListItemText
              primary={
                !user
                  ? t(`login_to_baggers`, `Login to Baggers`)
                  : t(`logout`, `Logout`)
              }
              onClick={() => {
                if (!user) {
                  navigate(`/auth/auth0`);
                } else {
                  navigate(`/auth/auth0/logout`);
                }
              }}
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
