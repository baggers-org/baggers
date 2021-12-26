import { Tab, TabProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const AppBarTab = styled(Tab)<TabProps>(({ theme }) => ({
  fontSize: theme.typography.pxToRem(10),
  color: theme.palette.grey[50],
}));
