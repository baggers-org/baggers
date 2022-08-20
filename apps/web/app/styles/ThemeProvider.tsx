import { ThemeProvider as MuiTP, createTheme } from '@mui/material';

import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { dark, light } from './theme';

export type Mode = 'light' | 'dark';
export const ColorModeContext = createContext({
  toggleColorMode: () => {
    //
  },
  mode: `light`,
});

const STORAGE_KEY = `baggers_theme`;

export const ThemeProvider: React.FC<
  PropsWithChildren<{ defaultMode?: Mode }>
> = ({ children, defaultMode = `dark` }) => {
  const [mode, setMode] = useState<Mode>(defaultMode);

  const contextValue = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === `light` ? `dark` : `light`));
      },
      mode,
    }),
    [mode]
  );

  useEffect(() => {
    if (typeof window !== `undefined`) {
      setMode(
        (document.cookie?.match(/baggers_theme=(\w*)/)?.[1] as Mode) || `dark`
      );
    } else {
      setMode(defaultMode);
    }
  }, [defaultMode]);

  useEffect(() => {
    if (typeof window !== `undefined` && mode) {
      document.cookie = `${STORAGE_KEY}=${mode}`;
    }
  }, [mode]);

  const theme = useMemo(
    () => createTheme(mode === `light` ? light : dark),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={contextValue}>
      <MuiTP theme={theme}>{children}</MuiTP>
    </ColorModeContext.Provider>
  );
};
