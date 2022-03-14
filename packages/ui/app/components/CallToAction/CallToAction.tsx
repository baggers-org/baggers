import React from 'react';
import { Box, Button, Grid, Slide, Typography, useTheme } from '@mui/material';

import { alpha } from '@mui/system';
import { RandomSeriesChart } from '~/components';
import { useTranslation } from 'react-i18next';
import { Link } from '@remix-run/react';

export const CallToAction: React.FC = () => {
  const { t } = useTranslation(`landing_page`);

  const theme = useTheme();
  return (
    <>
      <Slide in>
        <Box
          width="100%"
          height={{ xs: `70vh` }}
          position="absolute"
          zIndex={-1}
          sx={{ background: theme.palette?.gradient?.main }}
        />
      </Slide>

      <Box zIndex={-1}>
        <RandomSeriesChart
          position="absolute"
          top={0}
          zIndex={-1}
          height={200}
          width="100%"
          id="chart1"
          sx={{ mask: `#background` }}
          numberOfPoints={200}
          animation={{
            duration: 1000,
            delay: 0,
          }}
          color={alpha(theme.palette.primary.main, 0.2)}
        />

        <RandomSeriesChart
          position="absolute"
          zIndex={-1}
          top={200}
          height={200}
          width="100%"
          id="chart3"
          numberOfPoints={200}
          animation={{
            duration: 1000,
            delay: 200,
          }}
          color={alpha(theme.palette.primary.main, 0.37)}
        />
      </Box>
      <Grid px={{ xs: 2, md: 10 }} textAlign={{ xs: `center`, md: `left` }}>
        <Grid item xs={12} lg={9} xl={7}>
          <Typography
            variant="h1"
            fontWeight="600"
            color="white"
            pt={{ xs: 15, md: 20 }}
            fontSize={{ xs: 50, md: 72 }}
          >
            {t(`cta_title`, `The last portfolio tracker you'll ever need.`)}
          </Typography>
        </Grid>
        <Grid item md={5}>
          <Typography variant="h4" color="white" mt={5}>
            {t(
              `cta_description`,
              `Track your investments across thousands of brokers.`,
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Link to="/signup">
            <Button variant="contained" color="secondary" sx={{ mt: 5 }}>
              {t(`join_now`, `Join now`)}
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};
