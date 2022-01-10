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
      50: `#FAFAFA`,
      100: `#061A25`,
      200: `#D1D9DF`,
      300: `#F8F8F8`,
      400: `#D9D9D9`,
      500: `#F9F9F9`,
      600: `#E7E7E7`,
    },

    price: {
      profitBg: `#E6F6F2`,
      profitFg: `#1E4620`,
      lossBg: `#FCEAE8`,
      lossFg: `#611A15`,
    },

    action: { focus: `#2196f3` },
    success: {
      main: `#02A883`,
      light: `#56DAB3`,
    },
    error: {
      main: `#E3301B`,
    },
    lowEmphasis: `rgba(0,0,0,0.26)`,
    mediumEmphasis: `rgba(0,0,0,0.6)`,
    highEmphasis: `rgba(0,0,0,0.87)`,
  },
});
declare module '@mui/material/styles' {
  interface Palette {
    price: {
      profitBg: React.CSSProperties['color'];
      profitFg: React.CSSProperties['color'];
      lossBg: React.CSSProperties['color'];
      lossFg: React.CSSProperties['color'];
    };
    lowEmphasis: React.CSSProperties['color'];
    mediumEmphasis: React.CSSProperties['color'];
    highEmphasis: React.CSSProperties['color'];
  }
  interface PaletteOptions {
    price: {
      profitBg: React.CSSProperties['color'];
      profitFg: React.CSSProperties['color'];
      lossBg: React.CSSProperties['color'];
      lossFg: React.CSSProperties['color'];
    };
    lowEmphasis: React.CSSProperties['color'];
    mediumEmphasis: React.CSSProperties['color'];
    highEmphasis: React.CSSProperties['color'];
  }
}

export default theme;
