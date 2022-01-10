import React from 'react';
import { BaggersPageComponent } from '@/views/types';
import { Button, Container, Grid, Paper } from '@mui/material';
import { useEditPortfolio } from '@/hooks';
import { usePortfolioIdFromURL } from '../hooks';

export type SettingsPageProps = {};

export const SettingsPage: BaggersPageComponent = () => {
  const portfolioId = usePortfolioIdFromURL();
  const { removePortfolio } = useEditPortfolio(portfolioId);
  return (
    <Container maxWidth="lg">
      <Paper elevation={1} variant="outlined">
        <Grid container width="100%" height={900}>
          <Grid item xs={12}>
            <Button color="error" onClick={() => removePortfolio()}>
              Delete Portfolio
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
