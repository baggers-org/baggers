import { withStyles } from '@material-ui/core';
import theme from './theme';

const GlobalCss = withStyles({
  '@global': {
    '.MuiPaper-elevation3': {
      boxShadow: `-5px 4px 31px #E4E4E4`,
    },
    a: {
      color: theme.palette.action.focus,
      textDecoration: `none`,
      fontWeight: `bold`,
    },
  },
})(() => null);

export default GlobalCss;
