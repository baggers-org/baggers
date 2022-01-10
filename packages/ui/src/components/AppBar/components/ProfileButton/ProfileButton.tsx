import React from 'react';
import { Avatar, Button, Stack } from '@mui/material';
import { KeyboardArrowDownRounded } from '@mui/icons-material';

import { useCurrentUser } from '../../../../hooks';

export type ProfileButtonProps = {};
export const ProfileButton: React.FC<ProfileButtonProps> = () => {
  const user = useCurrentUser({ redirectTo: `/login` });

  const username = `${user?.attributes?.name} ${user?.attributes?.family_name}`;

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar />
        <Button endIcon={<KeyboardArrowDownRounded />}>{username}</Button>
      </Stack>
    </>
  );
};
