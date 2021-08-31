import { Typography, TypographyProps } from '@material-ui/core';
import Skeleton from 'react-loading-skeleton';

type Props = {
  loading?: boolean;
} & TypographyProps;
const BaggersTypography: React.FC<Props> = ({
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
