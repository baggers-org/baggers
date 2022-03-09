import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { ProfitLossOrNeutral } from "~/util";

export type PriceTagProps = {
  color: ProfitLossOrNeutral;
};
export const PriceTag: React.FC<PriceTagProps> = ({ color, children }) => {
  const theme = useTheme();

  const getColor = () => {
    if (color === `profit`) {
      return {
        bgcolor: theme.palette.price.profitBg,
        color: theme.palette.price.profitFg,
      };
    }
    if (color === `loss`) {
      return {
        bgcolor: theme.palette.price.lossBg,
        color: theme.palette.price.lossFg,
      };
    }

    return {
      bgcolor: theme.palette.price.neutralBg,
      color: theme.palette.price.neutralFg,
    };
  };
  return (
    <Box
      {...getColor()}
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
