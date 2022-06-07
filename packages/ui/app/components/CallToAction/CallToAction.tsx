import React from 'react';
import { alpha, Box, Button, Grid, Typography, useTheme } from '@mui/material';

import { useTranslation } from 'react-i18next';
import { Form } from '@remix-run/react';
import { RandomSeriesChart } from '../RandomSeriesChart/RandomSeriesChart';
import { RandomLine } from '../RandomSeriesChart/components/RandomLine';
import { GradientBackground } from '../GradientBackground';

export const CallToAction: React.FC = () => {
  const { t } = useTranslation(`landing_page`);
  const theme = useTheme();

  return (
    <>
      <GradientBackground />

      <Box position="absolute" width="100%" height={300} zIndex={-1}>
        <RandomSeriesChart>
          <RandomLine
            lineWidth={6}
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
            numberOfPoints={120}
            animate={{
              duration: 1200,
            }}
            strokeStyle={alpha(theme.palette.primary.main, 0.2)}
          />
        </RandomSeriesChart>
      </Box>
      <Grid px={{ xs: 2, md: 10 }} textAlign={{ xs: `center`, md: `left` }}>
        <Grid item xs={12} lg={9} xl={7}>
          <Typography
            variant="h1"
            fontWeight="600"
            color="white"
            pt={{ xs: 15, md: 20 }}
            fontSize={{ xs: 50, md: 72 }}
            maxWidth={{ xs: `100%`, lg: `75%` }}
          >
            {t(`cta_title`, `The last portfolio tracker you'll ever need.`)}
          </Typography>
        </Grid>
        <Grid item md={5}>
          <Typography variant="h4" mt={5} color="white">
            {t(
              `cta_description`,
              `Track your investments across thousands of brokers.`,
            )}
          </Typography>
        </Grid>
        <Grid item>
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
        </Grid>
      </Grid>
    </>
  );
};
