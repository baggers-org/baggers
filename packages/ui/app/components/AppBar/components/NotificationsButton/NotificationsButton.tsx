import React from 'react';

import { NotificationsNoneRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const NotificationsButton: React.FC = () => {
  const { t } = useTranslation();
  return (
    <IconButton aria-label={t(`notifications`, `Notifications`)}>
      <NotificationsNoneRounded />
    </IconButton>
  );
};
