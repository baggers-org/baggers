import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: `#2196F3`,
      contrastText: `#FFFFFF`,
    },
    secondary: {
      main: `#FFEB3B`,
      contrastText: `#000000`,
    },
    background: {
      default: `#F9F9F9`,
      paper: `#FFFFFF`,
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
    lowEmphasis: `rgba(0,0,0,0.26)`,
    mediumEmphasis: `rgba(0,0,0,0.6)`,
    highEmphasis: `rgba(0,0,0,0.87)`,
  },
});
declare module '@mui/material/styles' {
  interface Palette {
    lowEmphasis: React.CSSProperties['color'];
    mediumEmphasis: React.CSSProperties['color'];
    highEmphasis: React.CSSProperties['color'];
  }
  interface PaletteOptions {
    lowEmphasis: React.CSSProperties['color'];
    mediumEmphasis: React.CSSProperties['color'];
    highEmphasis: React.CSSProperties['color'];
  }
}

export default theme;
