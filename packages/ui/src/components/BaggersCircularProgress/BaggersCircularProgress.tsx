import theme from '@/styles/theme';
import { CircularProgress, CircularProgressProps } from '@mui/material';

export const BaggersCircularProgress: React.FC<CircularProgressProps> = ({
  ...muiProps
}) => {
  return (
    <CircularProgress
      sx={{ color: theme.palette.secondary.main }}
      {...muiProps}
    />
  );
};
