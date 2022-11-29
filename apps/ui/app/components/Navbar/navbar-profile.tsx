import React from 'react';

import {
  FaMoon,
  FaSignInAlt,
  FaSignOutAlt,
  FaSun,
  FaUserCircle,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useSubmit } from '@remix-run/react';
import { useCurrentUser } from '~/hooks/useCurrentUser';
import { Avatar } from '../../../../../packages/ui-components/src/lib/avatar/avatar';
import { Menu, MenuDivider, MenuItem } from '@baggers/ui-components';
import { Theme, useTheme } from '../theme';

export const ProfileButton: React.FC = () => {
  const user = useCurrentUser();
  const profilePhoto = user?.photos?.[0];

  const { t } = useTranslation(`common`);

  const [theme, setTheme] = useTheme();
  const submit = useSubmit();

  return (
    <>
      <Menu
        offsetX={-120}
        button={
          user ? (
            <Avatar
              src={profilePhoto}
              alt="profile"
              fallbackInitials={user.displayName?.[0]}
            />
          ) : (
            <FaUserCircle size="48px" className="opacity-30" />
          )
        }
      >
        <MenuItem
          textSecondary
          onClick={() =>
            submit(
              {},
              user
                ? {
                    action: '/auth/auth0/logout',
                    method: 'post',
                  }
                : {
                    action: '/auth/auth0/login',
                    method: 'post',
                  }
            )
          }
        >
          {user ? (
            <>
              <FaSignOutAlt /> {t('logout', 'Logout')}
            </>
          ) : (
            <>
              <FaSignInAlt /> {t('sign_in', 'Login')}
            </>
          )}
        </MenuItem>
        <MenuDivider />
        <MenuItem
          onClick={() => {
            setTheme((p) =>
              p === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
            );
          }}
        >
          {theme === Theme.DARK ? (
            <>
              <FaSun />
              {t('switch_to_light_theme', 'Switch to light theme')}
            </>
          ) : (
            <>
              <FaMoon />
              {t('switch_to_dark_theme', 'Switch to dark theme')}
            </>
          )}
        </MenuItem>
      </Menu>
    </>
  );
};
