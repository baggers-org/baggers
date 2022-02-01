import React from 'react';
import { Card, CardProps, useTheme } from '@mui/material';

export type DashedCardProps = CardProps;
export const DashedCard: React.FC<DashedCardProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        border: `1px dashed ${theme.palette.divider}`,
        background: `transparent`,
        height: `100%`,
      }}
      variant="outlined"
    >
      {children}
    </Card>
  );
};
