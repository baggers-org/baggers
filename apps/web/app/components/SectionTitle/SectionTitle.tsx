import { Typography, TypographyProps } from '@mui/material';
import React from 'react';

export type SectionTitleProps = TypographyProps;
export const SectionTitle: React.FC<SectionTitleProps> = (props) => {
  return <Typography variant="h5" {...props} />;
};
