import { useTheme } from '@mui/material';
import { useEffect } from 'react';
import Vivus from 'vivus';
import Logo from '../../../public/svg/logo.svg';

export const LoadingLogo = () => {
  const {
    palette: { mode },
  } = useTheme();

  useEffect(() => {
    const vivus = new Vivus(
      `logo-loading`,
      {
        type: `delayed`,
        duration: 400,
        delay: 150,
        pathTimingFunction: Vivus.LINEAR,
        animTimingFunction: Vivus.LINEAR,
      },
      () => {
        vivus.reset();
        vivus.play(5);
      }
    );
    vivus.play(5);
  }, [mode]);

  return <Logo />;
};
