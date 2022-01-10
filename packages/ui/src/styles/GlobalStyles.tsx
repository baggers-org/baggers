import { GlobalStyles as MuiGs } from '@mui/material';
import theme from './theme';

export const GlobalStyles = () => {
  return (
    <MuiGs
      styles={{
        scrollbarColor: theme.palette.primary.main,
        scrollbarWidth: `200px`,
      }}
    />
  );
};
