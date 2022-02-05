import React from 'react';
import {
  alpha,
  Box,
  Container,
  Grow,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import { RandomSeriesChart } from '@/components/RandomSeriesChart';
import { useTranslation } from 'next-i18next';
import { useIsMobile } from '@/hooks';
import { useBreakpointValue } from '@/hooks/useBreakpointValue';
import { BaggersPageComponent } from '../types';
import { SignupForm } from './components/SignupForm';

type Props = {};
const SignupPage: BaggersPageComponent<Props> = () => {
  const { t } = useTranslation(`signup`);
  const theme = useTheme();

  const isMobile = useIsMobile();
  const headerVariant = useBreakpointValue({ xs: `h5`, sm: `h4`, md: `h3` });

  return (
    <Stack direction="row">
      <Container
        maxWidth="md"
        sx={{
          ml: 0,
          mr: 0,
          position: { xs: `absolute`, md: `unset` },
          zIndex: 0,
          mt: 9,
        }}
      >
        <Grow in>
          <Stack pt={5} px={{ xs: 3, md: 6 }} spacing={1} height="100vh">
            <Typography
              variant={headerVariant}
              zIndex={1}
              color={isMobile ? `white` : undefined}
              mb={8}
            >
              {t(`create_your_baggers_account`, `Create your baggers account`)}
            </Typography>
            <SignupForm />
          </Stack>
        </Grow>
      </Container>
      <Box
        sx={{ background: theme.palette.gradient.main }}
        width="100%"
        height="100vh"
        overflow="hidden"
      >
        <RandomSeriesChart
          mt={20}
          height={500}
          width="110%"
          id="chart2"
          numberOfPoints={200}
          animation={{
            duration: 1000,
            delay: 0,
          }}
          color={alpha(theme.palette.primary.main, 0.37)}
        />
      </Box>
    </Stack>
  );
};
export default SignupPage;
