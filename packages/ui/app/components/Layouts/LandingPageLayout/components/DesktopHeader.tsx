import { Stack, Typography, useTheme, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Form, useLocation, useNavigate } from '@remix-run/react';
import { ThemeToggle } from '~/components/ThemeToggle';

import LogoDarkTheme from '../../../../../public/svg/logo_dark_50x50.svg';
import LogoLightTheme from '../../../../../public/svg/logo_light_50x50.svg';

export const DesktopHeader = () => {
  const theme = useTheme();
  const { t } = useTranslation(`landing_page`);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        color={theme.palette.getContrastText(theme.palette.background.default)}
      >
        {pathname === `login` && theme.palette.mode === `light` ? (
          <LogoLightTheme />
        ) : (
          <LogoDarkTheme />
        )}
        <Typography
          variant="h5"
          fontFamily="Archivo Black"
          color={pathname === `login` ? theme.palette.text.primary : `white`}
          onClick={() => navigate(`/`)}
        >
          BAGGERS
        </Typography>
      </Stack>
      <Stack direction="row" ml="auto" spacing={2} alignItems="center">
        <ThemeToggle />

        <Form action="/auth/auth0" method="post">
          <Button type="submit">{t(`login`, `Login`)}</Button>
        </Form>
      </Stack>
    </>
  );
};
