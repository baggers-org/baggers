import React from 'react';

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
    primary: {
      main: `#3c1bc0`,
    },
    price: {
      neutralBg: `#eaeaea`,
      neutralFg: `#121212`,
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
    primary: {
      main: `#ce93d8`,
      contrastText: `#000000`,
    },
    gradient: {
      main: `linear-gradient(#121212, #232323)`,
    },
    secondary: {
      main: `#90caf9`,
      contrastText: `#000000`,
    },

    price: {
      neutralBg: `#eaeaea`,
      neutralFg: `#121212`,
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
      main: `#d500f9`,
      contrastText: `#FFFFFF`,
    },
    secondary: {
      main: `#00b8d4`,
      contrastText: `#00000`,
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
      neutralBg: `#eaeaea`,
      neutralFg: `#121212`,
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
      neutralBg: React.CSSProperties['color'];
      neutralFg: React.CSSProperties['color'];
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
      neutralBg: React.CSSProperties['color'];
      neutralFg: React.CSSProperties['color'];
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
