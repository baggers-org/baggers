import React from 'react';

import { ThemeOptions } from '@mui/material';

export const SHARED_THEME: ThemeOptions = {
  components: {
    MuiButton: {
      defaultProps: {
        color: `primary`,
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          svg: {
            marginRight: `20px`,
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        outlined: ({ theme }) => ({
          backgroundColor: theme.palette.background.default,
        }),
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
      main: `#6874E8`,
      contrastText: `#FFFFFF`,
    },
    secondary: {
      main: `#ECA72C`,
      contrastText: `#000000`,
    },
    background: {
      default: `#121212`,
      paper: `#121212`,
    },
    text: {
      primary: `#F2F4F3`,
    },
    gradient: {
      main: `linear-gradient(#121212, #232323)`,
    },
    error: {
      main: `#EA4848`,
    },
    success: {
      main: `#7EFF47`,
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
      main: `#5666FB`,
      contrastText: `#FFFFFF`,
    },
    secondary: {
      main: `#FBAA1D`,
      contrastText: `#000000`,
    },
    text: {
      primary: `#1C1C1C`,
    },
    background: {
      paper: `#F2F4F3`,
      default: `#FFFFFF`,
    },
    warning: {
      main: `#FFD23F`,
      contrastText: `#000000`,
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
      profitBg: ``,
      profitFg: `#004d40`,
      lossBg: `#ffebee`,
      lossFg: `#611A15`,
    },

    action: { focus: `#2196f3` },
    success: {
      main: `#3BB273`,
    },
    error: {
      main: `#E15554`,
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
