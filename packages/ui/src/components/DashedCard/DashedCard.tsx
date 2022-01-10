import React from 'react';
import { Card, CardProps } from '@mui/material';

import theme from '@/styles/theme';

export type DashedCardProps = CardProps;
export const DashedCard: React.FC<DashedCardProps> = ({ children }) => {
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
