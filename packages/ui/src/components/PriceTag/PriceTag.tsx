import theme from '@/styles/theme';
import { Typography } from '@mui/material';
import { Box } from '@mui/material/node_modules/@mui/system';
import React from 'react';

export type PriceTagProps = {
  color: 'profit' | 'loss' | 'neutral';
};
export const PriceTag: React.FC<PriceTagProps> = ({ color, children }) => {
  return (
    <Box
      bgcolor={
        color === `profit`
          ? theme.palette.price.profitBg
          : theme.palette.price.lossBg
      }
      color={
        color === `profit`
          ? theme.palette.price.profitFg
          : theme.palette.price.lossFg
      }
      borderRadius="4px"
      py={0}
      maxHeight="20px"
      display="flex"
      alignItems="center"
      px={2}
    >
      <Typography variant="button" fontWeight="bold">
        {children}
      </Typography>
    </Box>
  );
};
