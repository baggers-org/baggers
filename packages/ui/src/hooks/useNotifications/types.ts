export type Notification = {
  type: 'info' | 'warning' | 'error' | 'default' | 'success';
  message: string;
};
