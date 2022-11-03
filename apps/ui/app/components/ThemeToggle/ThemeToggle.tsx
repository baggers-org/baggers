import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import { ColorModeContext } from 'apps/ui/app/styles';
import { Moon, Sun } from 'tabler-icons-react';

export const ThemeToggle: React.FC = () => {
  const { toggleColorMode, mode } = useContext(ColorModeContext);
  return (
    <IconButton onClick={() => toggleColorMode()}>
      {mode === 'dark' ? <Sun /> : <Moon />}
    </IconButton>
  );
};
