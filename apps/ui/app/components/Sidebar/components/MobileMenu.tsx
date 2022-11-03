import {
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
} from '@mui/material';
import { useNavigate } from '@remix-run/react';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Login, Logout, Menu2, Moon, Sun } from 'tabler-icons-react';
import { ColoredIcon } from 'apps/ui/app/components/ColoredIcon';
import { useCurrentUser } from 'apps/ui/app/hooks/useCurrentUser';
import { ColorModeContext } from 'apps/ui/app/styles';

export const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { toggleColorMode } = useContext(ColorModeContext);

  const user = useCurrentUser();

  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <IconButton onClick={() => setIsMenuOpen((o) => !o)}>
        <Menu2 />
      </IconButton>
      <Drawer
        open={isMenuOpen}
        anchor="left"
        onClose={() => setIsMenuOpen(false)}
        onClick={() => setIsMenuOpen(false)}
      >
        <List>
          <ListItemButton>
            <ColoredIcon icon={user ? <Logout /> : <Login />} />
            <ListItemText
              sx={{ ml: 2 }}
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
          <ListItemButton onClick={toggleColorMode}>
            <ColoredIcon
              icon={theme.palette.mode === 'dark' ? <Sun /> : <Moon />}
            />
            <ListItemText sx={{ ml: 2 }}>
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
