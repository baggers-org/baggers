import { Theme, useMediaQuery } from '@material-ui/core';

const useIsMobile = () => {
  return useMediaQuery((theme: Theme) => theme.breakpoints.down(900));
};
export default useIsMobile;
