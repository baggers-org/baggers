import { Theme, useMediaQuery } from '@mui/material';

export const useIsMobile = () => {
  return useMediaQuery((theme: Theme) => theme.breakpoints.down(900));
};
