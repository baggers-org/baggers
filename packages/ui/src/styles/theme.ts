import { ThemeOptions } from '@mui/material';

export const SHARED_THEME: ThemeOptions = {
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          svg: {
            marginRight: `20px`,
          },
        },
      },
    },
  },
  typography: {
    fontFamily: `Poppins`,
    h1: {
      fontFamily: `Plus Jakarta Sans`,
    },
    h2: {
      fontFamily: `Plus Jakarta Sans`,
      fontWeight: `600`,
    },
  },
  palette: {
    gradient: {
      main: `linear-gradient(#121212, #002171)`,
    },
    price: {
      profitBg: `#E6F6F2`,
      profitFg: `#1E4620`,
      lossBg: `#FCEAE8`,
      lossFg: `#611A15`,
    },
  },
};
export const DARK_THEME: ThemeOptions = {
  ...SHARED_THEME,
  palette: {
    ...SHARED_THEME.palette,
    mode: `dark`,
    gradient: {
      main: `linear-gradient(#121212, #232323)`,
    },
    secondary: {
      main: `#fff59d`,
      contrastText: `#121212`,
    },

    price: {
      profitBg: `#a5d6a7`,
      profitFg: `#003d00`,
      lossBg: `#ef9a9a`,
      lossFg: `#7f0000`,
    },
  },
};
export const LIGHT_THEME: ThemeOptions = {
  ...SHARED_THEME,
  palette: {
    mode: `light`,
    gradient: {
      main: `linear-gradient(#04223A ,#0069C0)`,
    },
    primary: {
      main: `#2196F3`,
      contrastText: `#FFFFFF`,
    },
    secondary: {
      main: `#FFEB3B`,
      contrastText: `#121212`,
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
      profitBg: `#e0f2f1`,
      profitFg: `#004d40`,
      lossBg: `#ffebee`,
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
};
declare module '@mui/material/styles' {
  interface Palette {
    gradient: {
      main: string;
    };
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
    gradient: {
      main: string;
    };
    price?: {
      profitBg: React.CSSProperties['color'];
      profitFg: React.CSSProperties['color'];
      lossBg: React.CSSProperties['color'];
      lossFg: React.CSSProperties['color'];
    };
    lowEmphasis?: React.CSSProperties['color'];
    mediumEmphasis?: React.CSSProperties['color'];
    highEmphasis?: React.CSSProperties['color'];
  }
}
