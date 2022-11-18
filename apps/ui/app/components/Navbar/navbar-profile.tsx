import React from 'react';

import { useTranslation } from 'react-i18next';
import { Form } from '@remix-run/react';
import { useCurrentUser } from '~/hooks/useCurrentUser';
import { Avatar } from '../../../../../packages/ui-components/src/lib/avatar/avatar';

export const ProfileButton: React.FC = () => {
  const user = useCurrentUser();
  const profilePhoto = user?.photos?.[0];

  const { t } = useTranslation(`common`);

  console.log(user);

  if (!user) {
    return (
      <Form method="post" action="/auth/auth0/login">
        <button type="submit">{t(`login`, `Login`)}</button>
      </Form>
    );
  }

  return (
    <>
      <Avatar
        src={profilePhoto}
        fallbackInitials={user.displayName?.[0]}
        alt={t('profile_alt', 'Your profile')}
      />
    </>
  );
};
