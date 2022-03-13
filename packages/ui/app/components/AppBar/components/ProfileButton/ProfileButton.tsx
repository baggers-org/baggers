import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from '@mui/material';
import { KeyboardArrowDownRounded, Logout } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Form, useMatches } from '@remix-run/react';

export type ProfileButtonProps = {};
export const ProfileButton: React.FC<ProfileButtonProps> = () => {
  const matches = useMatches();

  const user = matches.find((m) => m.id === `routes/__app`)?.data;
  
  const profilePhoto = user?.photos?.[0];

  const { t } = useTranslation(`common`);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button
          startIcon={<Avatar src={profilePhoto} />}
          endIcon={<KeyboardArrowDownRounded />}
          onClick={handleClick}
        >
          {user?.displayName}
        </Button>
      </Stack>
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
          <Avatar src={`url(${user?.photos?.[0].value})`} imgProps={{
            referrerPolicy: 'no-referrer'
          }}/>
          {` `}
          {t(`profile`, `Profile`)}
        </MenuItem>
        <MenuItem>
          <Avatar /> {t(`account`, `Account`)}
        </MenuItem>
        <Divider />
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
