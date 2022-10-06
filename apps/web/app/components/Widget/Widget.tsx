import { Paper } from '@mui/material';
import { title } from 'process';
import React from 'react';
import { Typography } from 'tabler-icons-react';

export type WidgetProps = {
  title: string | React.ReactElement;
};
export const Widget: React.FC<WidgetProps> = ({ title, children }) => {
  return (
    <>
      <Paper sx={{ px: 2, pt: 1, pb: 5 }}>
        <Typography variant="subtitle1" textTransform="uppercase" mb={2}>
          {title}
        </Typography>
        {children}
      </Paper>
    </>
  );
};
