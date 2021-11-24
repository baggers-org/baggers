import { useSnackbar } from 'notistack';
import { Notification } from './types';

export const useNotifications = () => {
  const { enqueueSnackbar } = useSnackbar();

  const sendNotification = (notification: Notification) =>
    enqueueSnackbar(notification.message, { variant: notification.type });

  return {
    sendNotification,
  };
};
