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

import { useTranslation } from 'next-i18next';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useCurrentUser } from '../../../../hooks';

export type ProfileButtonProps = {};
export const ProfileButton: React.FC<ProfileButtonProps> = () => {
  const user = useCurrentUser({ redirectTo: `/login` });
  const username = `${user?.attributes?.name} ${user?.attributes?.family_name}`;

  const { t } = useTranslation(`common`);
  const { push } = useRouter();

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
          startIcon={<Avatar />}
          endIcon={<KeyboardArrowDownRounded />}
          onClick={handleClick}
        >
          {username}
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
          <Avatar /> {t(`profile`, `Profile`)}
        </MenuItem>
        <MenuItem>
          <Avatar /> {t(`account`, `Account`)}
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            Auth.signOut();
            push(`/login`);
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t(`logout`, `Logout`)}
        </MenuItem>
      </Menu>
    </>
  );
};
