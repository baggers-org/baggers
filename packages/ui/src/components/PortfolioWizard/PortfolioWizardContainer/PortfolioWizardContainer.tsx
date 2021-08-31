import { Container, withStyles } from '@material-ui/core';

const PortfolioWizardContainer = withStyles((theme) => ({
  root: {
    paddingTop: `${theme.spacing(2)}px`,
    paddingLeft: `${theme.spacing(4)}px`,
    paddingRight: `${theme.spacing(4)}px`,
    minHeight: `600px`,
  },
}))(Container);

export default PortfolioWizardContainer;
