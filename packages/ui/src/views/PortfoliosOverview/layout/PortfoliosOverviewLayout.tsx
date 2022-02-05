import React from 'react';
import { useTranslation } from 'next-i18next';
import { Grid, Typography } from '@mui/material';

import { BaseLayout } from '@/components';
import { PortfoliosOverviewTabs } from '..';

export const PortfoliosOverviewLayout: React.FC = ({ children }) => {
  const { t } = useTranslation();
  return (
    <BaseLayout>
      <Grid container alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h4" color="mediumEmphasis">
            {t(`portfolios_overview`, `Portfolios Overview`)}
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          md={6}
          justifyContent={{ xs: `flex-start`, md: `flex-end` }}
        >
          <PortfoliosOverviewTabs />
        </Grid>
        <Grid item xs={12} pt={7}>
          {children}
        </Grid>
      </Grid>
    </BaseLayout>
  );
};
