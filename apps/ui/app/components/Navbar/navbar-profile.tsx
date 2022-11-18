import React from 'react';

import { useTranslation } from 'react-i18next';
import { Form, useSubmit } from '@remix-run/react';
import { useCurrentUser } from '~/hooks/useCurrentUser';
import { Avatar } from '../../../../../packages/ui-components/src/lib/avatar/avatar';
import { Menu, MenuItem } from '@baggers/ui-components';
import { Logout } from 'tabler-icons-react';

export const ProfileButton: React.FC = () => {
  const user = useCurrentUser();
  const profilePhoto = user?.photos?.[0];

  const { t } = useTranslation(`common`);

  const submit = useSubmit();
  if (!user) {
    return (
      <Form method="post" action="/auth/auth0/login">
        <button type="submit">{t(`login`, `Login`)}</button>
      </Form>
    );
  }

  return (
    <>
      <Menu
        offsetX={-60}
        button={
          <Avatar
            src={profilePhoto}
            fallbackInitials={user.displayName?.[0]}
            alt={t('profile_alt', 'Your profile')}
          />
        }
      >
        <MenuItem
          onClick={() =>
            submit(
              {},
              {
                action: '/auth/auth0/logout',
                method: 'post',
              }
            )
          }
        >
          <Logout /> {t('logout', 'Logout')}
        </MenuItem>
      </Menu>
    </>
  );
};
