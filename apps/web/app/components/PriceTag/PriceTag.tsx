import React, { useContext } from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import { formatCurrency, isProfitLossOrNeutral } from '~/util';
import { alpha, TypographyProps } from '@mui/system';
import { MarketDataRefreshContext } from '~/hooks/useMarketDataRefresh';

export type PriceTagProps = {
  value: number;
  label?: string;
  isPercent?: boolean;
} & TypographyProps;
export const PriceTag: React.FC<PriceTagProps> = ({
  value,
  isPercent,
  label,
  ...props
}) => {
  const theme = useTheme();

  const getColor = () => {
    const delta = isProfitLossOrNeutral(value);
    let color = theme.palette.text.primary;

    if (delta === `profit`) {
      color = theme.palette.success.main;
    }
    if (delta === `loss`) {
      color = theme.palette.error.main;
    }

    return color;
  };

  const formattedValue =
    isPercent && value ? `${value.toFixed(2)}%` : formatCurrency(value);
  return (
    <Stack>
      {label}
      {!value && 'N/A'}
      {value ? (
        <Typography variant="subtitle1" color={getColor()} {...props}>
          {value > 0 ? `+${formattedValue}` : formattedValue}
        </Typography>
      ) : null}
    </Stack>
  );
};
