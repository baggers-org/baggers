import React, { useContext, useState } from 'react';
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  useTheme,
} from '@mui/material';
import {
  Brightness4Outlined,
  DarkModeOutlined,
  KeyboardArrowDownRounded,
  Logout,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Form } from '@remix-run/react';
import { useCurrentUser } from '~/hooks/useCurrentUser';
import { ColorModeContext } from '~/styles';

export type ProfileButtonProps = {};
export const ProfileButton: React.FC<ProfileButtonProps> = () => {
  const user = useCurrentUser();
  const theme = useTheme();
  const profilePhoto = user?.photos?.[0];
  const { toggleColorMode } = useContext(ColorModeContext);

  const { t } = useTranslation(`common`);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!user) {
    return (
      <Form method="post" action="/auth/auth0">
        <Button
          type="submit"
          color={theme.palette.mode === `light` ? `secondary` : `primary`}
        >
          {t(`login`, `Login`)}
        </Button>
      </Form>
    );
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <Avatar />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            border: `1px solid #EAEAEA`,
            mt: 1,
            minWidth: `200px`,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: `right`, vertical: `top` }}
        anchorOrigin={{ horizontal: `right`, vertical: `bottom` }}
      >
        <MenuItem>
          <Avatar
            src={profilePhoto}
            imgProps={{
              referrerPolicy: `no-referrer`,
            }}
          />
          {` `}
          {user.displayName}
        </MenuItem>
        <MenuItem>
          <Avatar /> {t(`account`, `Account`)}
        </MenuItem>
        <Divider />
        <MenuItem onClick={toggleColorMode}>
          {theme.palette.mode === `dark` ? (
            <Brightness4Outlined />
          ) : (
            <DarkModeOutlined />
          )}
          {theme.palette.mode === `dark`
            ? t(`switch_to_light_theme`, `Switch to light theme`)
            : t(`switch_to_dark_theme`, `Switch to dark theme`)}
        </MenuItem>
        <Form action="/auth/auth0/logout" method="post">
          <Button type="submit">
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            {t(`logout`, `Logout`)}
          </Button>
        </Form>
      </Menu>
    </>
  );
};
