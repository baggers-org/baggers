import {
  CircularProgress,
  CircularProgressProps,
  withStyles,
} from '@material-ui/core';

const StyledCircularProgress = withStyles((theme) => ({
  root: {
    color: theme.palette.secondary.light,
  },
}))(CircularProgress);
const BaggersCircularProgress: React.FC<CircularProgressProps> = ({
  ...muiProps
}) => {
  return <StyledCircularProgress {...muiProps} />;
};

export default BaggersCircularProgress;
