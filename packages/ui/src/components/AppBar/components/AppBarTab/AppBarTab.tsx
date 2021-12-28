import React from 'react';

import { useBreakpointValue } from '@/hooks/useBreakpointValue';
import { Tab, TabProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { darken } from '@mui/system';

const StyledTab = styled(Tab)<TabProps>(({ theme }) => ({
  ':hover': {
    background: darken(theme.palette.background.paper, 0.1),
  },
}));
export const AppBarTab: React.FC<TabProps> = (props) => {
  const { label } = props;
  const realLabel = useBreakpointValue({
    xs: label,
    md: undefined,
    lg: label,
  });

  return <StyledTab {...props} label={realLabel} />;
};
