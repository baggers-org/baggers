import { Typography, TypographyProps } from '@mui/material';
import Skeleton from 'react-loading-skeleton';

export type BaggersTypographyProps = {
  loading?: boolean;
} & TypographyProps;
export const BaggersTypography: React.FC<BaggersTypographyProps> = ({
  loading,
  children,
  ...muiProps
}) => {
  if (loading || !children) {
    return <Skeleton />;
  }
  return <Typography {...muiProps}>{children}</Typography>;
};
export default BaggersTypography;
