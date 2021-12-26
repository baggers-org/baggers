import { Box, Grid, Fade, Typography } from '@mui/material';
import React from 'react';
import Logo from '../../../../public/Logo/logo_light_50x50.svg';

export const LoginFormWrapper: React.FC = ({ children }) => {
  return (
    <Fade in>
      <Box display="flex" height="100vh">
        <Grid
          container
          direction="column"
          alignItems="center"
          margin="auto"
          width="320px"
        >
          <Grid xs={12} item justifyContent="center" container>
            <Logo />
          </Grid>
          <Grid item xs={12} container justifyContent="center" mb={2}>
            <Box fontFamily="Archivo Black" fontSize="35px">
              BAGGERS
            </Box>
          </Grid>
          <Box mb={2}>
            <form>{children}</form>
          </Box>
          <Typography variant="body1" color="lowEmphasis" textAlign="center">
            &copy; 2021 Baggers
          </Typography>
        </Grid>
      </Box>
    </Fade>
  );
};
