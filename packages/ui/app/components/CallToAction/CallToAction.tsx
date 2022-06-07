import React, { useMemo } from 'react';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';

import { useTranslation } from 'react-i18next';
import { Form } from '@remix-run/react';
import { RandomSeriesChart } from '../RandomSeriesChart/RandomSeriesChart';
import { RandomLine } from '../RandomSeriesChart/components/RandomLine';

export const CallToAction: React.FC = () => {
  const { t } = useTranslation(`landing_page`);

  const theme = useTheme();

  const gradient = useMemo(() => {
    if (theme.palette.mode === `light`) {
      return `linear-gradient(${theme.palette.background.paper},${theme.palette.background.default} )`;
    }
    return `linear-gradient(#121212, #232323)`;
  }, [theme]);
  return (
    <>
      <Box
        width="100%"
        height={{ xs: `70vh` }}
        position="absolute"
        zIndex={-1}
        sx={{ background: gradient }}
      />

      <Box position="absolute" width="100%" height={300}>
        <RandomSeriesChart>
          <RandomLine lineWidth={1} volatility={0.2} numberOfPoints={120} />
        </RandomSeriesChart>
      </Box>
      <Grid px={{ xs: 2, md: 10 }} textAlign={{ xs: `center`, md: `left` }}>
        <Grid item xs={12} lg={9} xl={7}>
          <Typography
            variant="h1"
            fontWeight="600"
            pt={{ xs: 15, md: 20 }}
            fontSize={{ xs: 50, md: 72 }}
          >
            {t(`cta_title`, `The last portfolio tracker you'll ever need.`)}
          </Typography>
        </Grid>
        <Grid item md={5}>
          <Typography variant="h4" mt={5}>
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
