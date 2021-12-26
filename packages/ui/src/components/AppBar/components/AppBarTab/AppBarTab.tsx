import { Tab, TabProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { lighten } from '@mui/system';

export const AppBarTab = styled(Tab)<TabProps>(({ theme }) => ({
  fontSize: theme.typography.pxToRem(10),
  color: theme.palette.grey[50],
  ':hover': {
    background: theme.palette.appBar && lighten(theme.palette.appBar, 0.1),
  },
}));
