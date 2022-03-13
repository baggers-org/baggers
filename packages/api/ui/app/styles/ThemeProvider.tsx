import { ThemeProvider as MuiTP, createTheme } from "@mui/material";

import { createContext, useEffect, useMemo, useState } from "react";
import { DARK_THEME, LIGHT_THEME } from "~/styles/theme";

type Mode = "light" | "dark";
export const ColorModeContext = createContext({
  toggleColorMode: () => {
    //
  },
  mode: `light`,
});

const STORAGE_KEY = `baggers_theme`;

export const ThemeProvider: React.FC = ({ children, themeCookie }) => {
  const [mode, setMode] = useState<Mode>(`light`);

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
      const storageValue = window.localStorage.getItem(STORAGE_KEY);
      setMode((storageValue as Mode) || `light`);
    } else {
      themeCook

    }
  }, []);

  useEffect(() => {
    if (typeof window !== `undefined` && mode) {
      window.localStorage.setItem(STORAGE_KEY, mode as Mode);
    }
  }, [mode]);

  const theme = useMemo(
    () => createTheme(mode === `light` ? LIGHT_THEME : DARK_THEME),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={contextValue}>
      <MuiTP theme={theme}>{children}</MuiTP>
    </ColorModeContext.Provider>
  );
};
