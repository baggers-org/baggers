import React from 'react';
import { ProfitLossOrNeutral } from '@/util';
import { Box, Typography, useTheme } from '@mui/material';

export type PriceTagProps = {
  color: ProfitLossOrNeutral;
};
export const PriceTag: React.FC<PriceTagProps> = ({ color, children }) => {
  const theme = useTheme();
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
