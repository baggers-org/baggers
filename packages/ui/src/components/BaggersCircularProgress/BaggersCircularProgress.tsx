import {
  CircularProgress,
  CircularProgressProps,
  useTheme,
} from '@mui/material';

export const BaggersCircularProgress: React.FC<CircularProgressProps> = ({
  ...muiProps
}) => {
  const theme = useTheme();
  return (
    <CircularProgress
      sx={{ color: theme.palette.secondary.main }}
      {...muiProps}
    />
  );
};
