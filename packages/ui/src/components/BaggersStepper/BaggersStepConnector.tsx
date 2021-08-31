import theme from '@/styles/theme';
import { StepConnector, withStyles } from '@material-ui/core';

const BaggersStepConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: `calc(-50% + 16px)`,
    right: `calc(50% + 16px)`,
  },
  active: {
    '& $line': {
      borderColor: `${theme.palette.secondary.main}`,
    },
  },
  completed: {
    '& $line': {
      borderColor: `${theme.palette.secondary.main}`,
    },
  },
  line: {
    borderColor: `#eaeaf0`,
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

export default BaggersStepConnector;
