import { Avatar, lighten, useTheme } from '@mui/material';
import React from 'react';

export type ColoredIconProps = {
  icon: any;
};
export const ColoredIcon: React.FC<ColoredIconProps> = ({ icon }) => {
  const theme = useTheme();
  return (
    <Avatar
      variant="rounded"
      sx={{
        width: 28,
        height: 28,

        color: theme.palette.primary.dark,
        bgcolor: lighten(theme.palette.primary.light, 0.5),
      }}
    >
      {icon}
    </Avatar>
  );
};
