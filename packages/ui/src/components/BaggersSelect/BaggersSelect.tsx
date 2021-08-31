import Skeleton from 'react-loading-skeleton';
import { SelectProps, withStyles, Select } from '@material-ui/core';

type Props = {
  loading?: boolean;
};

const StyledSelect = withStyles(() => ({
  root: {
    minWidth: `100px`,
  },
}))(Select);

const BaggersSelect: React.FC<SelectProps & Props> = ({
  loading,
  ...muiProps
}) => {
  if (loading) {
    const height = 55;
    return <Skeleton height={height} style={{ marginTop: `20px` }} />;
  }
  return <StyledSelect {...muiProps} />;
};
export default BaggersSelect;
