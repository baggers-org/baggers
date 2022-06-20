import React from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import { formatCurrency, isProfitLossOrNeutral } from '~/util';
import { TypographyProps } from '@mui/system';

export type PriceTagProps = {
  value: number;
  label?: string;
  isPercent?: boolean;
};
export const PriceTag: React.FC<PriceTagProps & TypographyProps> = ({
  value,
  isPercent,
  label,
  ...props
}) => {
  const theme = useTheme();

  const getColor = () => {
    const delta = isProfitLossOrNeutral(value);

    if (delta === `profit`) {
      return theme.palette.success.main;
    }
    if (delta === `loss`) {
      return theme.palette.error.main;
    }

    return theme.palette.text.primary;
  };

  const formattedValue = isPercent
    ? `${value.toFixed(2)}%`
    : formatCurrency(value);
  return (
    <Stack>
      {label}
      <Typography variant="subtitle1" color={getColor()} {...props}>
        {value > 0 ? `+${formattedValue}` : formattedValue}
      </Typography>
    </Stack>
  );
};
