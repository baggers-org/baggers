import { useSnackbar } from 'notistack';
import { Notification } from './types';

const useNotifications = () => {
  const { enqueueSnackbar } = useSnackbar();

  const sendNotification = (notification: Notification) =>
    enqueueSnackbar(notification.message, { variant: notification.type });

  return {
    sendNotification,
  };
};

export default useNotifications;
