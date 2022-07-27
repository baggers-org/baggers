import { GlobalStyles as MuiGlobals, useTheme } from '@mui/material';

export function GlobalStyles() {
  const theme = useTheme();
  return (
    <MuiGlobals
      styles={{
        a: {
          color: theme.palette.secondary.main,
        },
      }}
    />
  );
}
