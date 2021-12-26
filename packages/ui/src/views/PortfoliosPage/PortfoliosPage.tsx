import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';

const PortfoliosPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Grid xs={12} md={9}>
      <Typography variant="h4" color="mediumEmphasis">
        {t(`portfolios_overview`, `Portfolios Overview`)}
      </Typography>
    </Grid>
  );
};
export default PortfoliosPage;
