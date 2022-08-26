import { useTheme } from '@mui/material';
import { useEffect } from 'react';
import Vivus from 'vivus';
import LogoDark from '../../../public/svg/logo_loading_dark.svg';
import LogoLight from '../../../public/svg/logo_light_50x50.svg';

export const LoadingLogo = () => {
  const {
    palette: { mode },
  } = useTheme();

  const Logo = mode === `dark` ? LogoDark : LogoLight;
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
      },
    );
    vivus.play(5);
  }, [mode]);

  return <Logo />;
};
