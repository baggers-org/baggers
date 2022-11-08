import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { alpha, Box } from '@mui/system';
import React from 'react';

export type NewsCardProps = {
  variant: 'compact' | 'spotlight' | 'standard';
  heading: string;
  subText: JSX.Element;
  imageUrl: string;
};
export const NewsCard: React.FC<NewsCardProps> = ({
  variant,
  heading,
  subText,
  imageUrl,
}) => {
  if (variant === `spotlight`) {
    return (
      <Box
        width="100%"
        height="500px"
        sx={{
          backgroundImage: `url(${imageUrl})`,
          filter: `grayscale(30%)`,
          backgroundRepeat: `no-repeat`,
          backgroundSize: `cover`,
        }}
      >
        <Box
          sx={{
            background: alpha(grey[900], 0.7),
          }}
          p={2}
        >
          <Typography variant="h2" sx={{ opacity: 1, color: `white` }}>
            {heading}
          </Typography>
        </Box>
        <Box maxWidth="40%">{subText}</Box>
      </Box>
    );
  }

  return null;
};
