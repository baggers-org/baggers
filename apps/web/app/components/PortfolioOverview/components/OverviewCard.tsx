import { Paper, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

export type OverviewCardProps = {
  title: string | React.ReactElement;
};
export const OverviewCard: React.FC<PropsWithChildren<OverviewCardProps>> = ({
  title,
  children,
}) => {
  return (
    <Paper sx={{ px: 2, pt: 1, pb: 5 }}>
      <Typography variant="subtitle1" textTransform="uppercase" mb={2}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};
