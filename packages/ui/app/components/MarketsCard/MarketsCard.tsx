import { Paper, Typography } from '@mui/material';
import React from 'react';

export type MarketsCardProps = {};
export const MarketsCard: React.FC<MarketsCardProps> = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant='h6'>Markets</Typography>
    </Paper>
  );
};
