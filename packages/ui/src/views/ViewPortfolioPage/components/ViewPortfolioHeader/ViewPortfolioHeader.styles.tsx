import { Paper, withStyles } from '@material-ui/core';

export const Container = withStyles((theme) => ({
  root: {
    padding: `${theme.spacing(0.1)}rem`,
  },
}))(Paper);
