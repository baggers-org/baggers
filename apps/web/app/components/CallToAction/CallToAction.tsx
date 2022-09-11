import React, { useMemo } from 'react';
import {
  alpha,
  Box,
  Button,
  Container,
  darken,
  Typography,
  useTheme,
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import { Form } from '@remix-run/react';
import { RandomSeriesChart } from '../RandomSeriesChart/RandomSeriesChart';
import { RandomLine } from '../RandomSeriesChart/components/RandomLine';

export const CallToAction: React.FC = () => {
  const { t } = useTranslation(`landing_page`);
  const theme = useTheme();

  const gradient = useMemo(() => {
    if (theme.palette.mode === 'dark') {
      return `linear-gradient(${darken(
        theme.palette.primary.main,
        0.75
      )}, ${darken(theme.palette.primary.main, 0.82)})`;
    }
    return `linear-gradient(${darken(theme.palette.primary.main, 0.6)}, ${
      theme.palette.primary.dark
    })`;
  }, [theme]);

  return (
    <>
      <Box width="100%" height={450} zIndex={-1} sx={{ background: gradient }}>
        <RandomSeriesChart>
          <RandomLine
            lineWidth={6}
            height={200}
            volatility={0.1}
            numberOfPoints={120}
            animate={{
              duration: 1000,
            }}
            strokeStyle={alpha(theme.palette.primary.light, 0.2)}
          />
          <RandomLine
            lineWidth={3}
            volatility={0.05}
            height={200}
            numberOfPoints={120}
            animate={{
              duration: 1200,
            }}
            strokeStyle={alpha(theme.palette.primary.main, 0.2)}
          />
        </RandomSeriesChart>
      </Box>
      <Container maxWidth="xl">
        <Box position="absolute" top={0}>
          <Typography
            variant="h1"
            fontWeight="600"
            color="white"
            fontSize={{ xs: 40, md: 65 }}
            pt={{ xs: 15, md: 7 }}
            maxWidth={{ xs: `100%`, lg: `75%` }}
          >
            {t(`cta_title`, `The last portfolio tracker you'll ever need.`)}
          </Typography>
          <Typography variant="h4" mt={5} color="white">
            {t(
              `cta_description`,
              `Track your investments across thousands of brokers.`
            )}
          </Typography>
          <Form action="/auth/auth0" method="post">
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ mt: 5 }}
              type="submit"
            >
              {t(`join_now`, `Join now`)}
            </Button>
          </Form>
        </Box>
      </Container>
    </>
  );
};
