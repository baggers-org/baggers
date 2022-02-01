import { Stack, Typography, Link, useTheme } from '@mui/material';
import { useTranslation } from 'next-i18next';
import NextLink from 'next/link';

import { ThemeToggle } from '@/components';
import { useRouter } from 'next/router';
import LogoDarkTheme from '../../../../../public/Logo/logo_dark_50x50.svg';
import LogoLightTheme from '../../../../../public/Logo/logo_light_50x50.svg';

export const DesktopHeader = () => {
  const theme = useTheme();
  const { t } = useTranslation(`landing_page`);
  const { pathname } = useRouter();
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        color={theme.palette.getContrastText(theme.palette.background.default)}
      >
        {theme.palette.mode === `light` && pathname !== `/login` ? (
          <LogoLightTheme />
        ) : (
          <LogoDarkTheme />
        )}
        <Typography
          variant="h5"
          fontFamily="Archivo Black"
          color={pathname === `/login` ? `white` : undefined}
        >
          <Link
            color={theme.palette.text.primary}
            sx={{ a: { color: theme.palette.text.primary } }}
          >
            <NextLink href="/">BAGGERS</NextLink>
          </Link>
        </Typography>
      </Stack>
      <Stack direction="row" ml="auto" spacing={2} alignItems="center">
        <ThemeToggle />

        <Link sx={{ color: `white`, a: { color: `white` } }}>
          <NextLink href="/login">{t(`login`, `Login`)}</NextLink>
        </Link>
      </Stack>
    </>
  );
};
