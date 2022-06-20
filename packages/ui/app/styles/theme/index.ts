import { ThemeBuilder } from 'material-themer';

const themer = new ThemeBuilder({
  shadows: [
    `none`,
    `0px 2px 6px #0000000A`,
    `0px 2px 6px #0000000A`,
    `0px 2px 6px #0000000A`,
    `0px 2px 6px #0000000A`,
    `0px 2px 6px #0000000A`,
    `0px 2px 6px #0000000A`,
    `0px 2px 6px #0000000A`,
    `0px 2px 6px #0000000A`,
    `0px 2px 6px #0000000A`,
    `0px 2px 6px #0000000A`,
    `0px 2px 6px #0000000A`,
    `0px 2px 6px #0000000A`,
    `0px 2px 6px #0000000A`,
    `0px 2px 6px #0000000A`,
    `0px 2px 6px #0000000A`,
    `0px 2px 6px #0000000A`,
    `0px 2px 6px #0000000A`,
    `0px 2px 6px #0000000A`,
    `0px 2px 6px #0000000A`,
    `0px 2px 6px #0000000A`,
    `0px 2px 6px #0000000A`,
    `0px 2px 6px #0000000A`,
    `0px 2px 6px #0000000A`,
    `0px 2px 6px #0000000A`,
  ],
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
});

themer.setLightColors({
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
    paper: `#FFFFFF`,
    default: `#F2F4F3`,
  },
  warning: {
    main: `#FFD23F`,
    contrastText: `#000000`,
  },
  grey: {
    50: `#FAFAFA`,
    100: `#061A25`,
    200: `#D1D9DF`,
    300: `#C9CAD9`,
    400: `#D9D9D9`,
    500: `#F9F9F9`,
    600: `#E7E7E7`,
    900: `#0E131F`,
  },
  success: {
    main: `#3BB273`,
  },
  error: {
    main: `#E15554`,
  },
  lowEmphasis: `rgba(0,0,0,0.26)`,
  mediumEmphasis: `rgba(0,0,0,0.6)`,
  highEmphasis: `rgba(0,0,0,0.87)`,
});

themer.setDarkColors({
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
});

const { light, dark } = themer.build();

export { light, dark };

declare module '@mui/material/styles' {
  interface Palette {
    gradient: {
      main: string;
    };
    lowEmphasis: React.CSSProperties['color'];
    mediumEmphasis: React.CSSProperties['color'];
    highEmphasis: React.CSSProperties['color'];
  }
  interface PaletteOptions {
    gradient: {
      main: string;
    };
    lowEmphasis?: React.CSSProperties['color'];
    mediumEmphasis?: React.CSSProperties['color'];
    highEmphasis?: React.CSSProperties['color'];
  }
}
