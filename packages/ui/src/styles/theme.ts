import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: `#061a25`,
    },
    background: {
      default: `#F9F9F9`,
      paper: `#FFFFFF`,
    },
    secondary: {
      main: `#f2c13c`,
    },

    grey: {
      50: `#FFFFFF`,
      100: `#061A25`,
      200: `#D1D9DF`,
      300: `#F8F8F8`,
      400: `#D9D9D9`,
      500: `#F9F9F9`,
      600: `#E7E7E7`,
    },

    action: { focus: `#2196f3` },
    success: {
      main: `#35C32D`,
    },

    error: {
      main: `#d32f2f`,
    },

    text: {
      primary: `#3D3D3D`,
      secondary: `#81898D`,
    },
  },
  typography: {
    fontSize: 14,
    h1: {
      fontSize: `2.2rem`,
      fontWeight: `lighter`,
      letterSpacing: `-1.5px`,
    },
    h2: {
      fontWeight: `lighter`,
      fontSize: `2rem`,
      letterSpacing: `-0.5px`,
    },
    h3: {
      fontSize: `1.5rem`,
    },
    h4: {
      fontSize: `1.2rem`,
    },
    h5: {
      fontSize: `1.1rem`,
    },
    h6: {
      fontWeight: `bold`,
      fontSize: `1.05rem`,
    },
    subtitle1: {
      fontWeight: `bold`,
    },
    body1: {
      fontSize: `1rem`,
    },
    body2: {
      fontSize: `0.9rem`,
    },
    fontFamily: `Amiko`,
  },
});
export default theme;
