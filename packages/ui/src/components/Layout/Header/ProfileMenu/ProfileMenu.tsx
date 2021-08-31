import { Avatar, Button, Menu, MenuItem, MenuProps } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

const ProfileMenu = () => {
  const [user, setUser] = useState();
  const [anchorEl, setAnchorEl] = useState<MenuProps['anchorEl']>(undefined);

  const { push, prefetch } = useRouter();
  useEffect(() => {
    prefetch(`/login`);
    const getUserSession = async () => {
      const session = await Auth.currentAuthenticatedUser();

      setUser(session.username);
    };

    getUserSession();
  }, []);

  return (
    <div>
      <Button onClick={(e) => setAnchorEl(e?.currentTarget)}>
        <Avatar />
      </Button>
      <Menu
        open={!!anchorEl}
        onClose={() => setAnchorEl(undefined)}
        anchorEl={anchorEl}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem
          onClick={() => {
            Auth.signOut();
            push(`/login`);
          }}
        >
          Log Out
        </MenuItem>
      </Menu>
    </div>
  );
};
export default ProfileMenu;
