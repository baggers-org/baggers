import { Box, Grid } from '@mui/material';
import React from 'react';
import Logo from '../../../../public/Logo/Mono.svg';
import { CentredPaper } from '../CentredPaper';

export const LoginFormWrapper: React.FC = ({ children }) => {
  return (
    <CentredPaper>
      <Grid
        container
        direction="column"
        alignItems="center"
        style={{
          paddingTop: `40px`,
          paddingBottom: `40px`,
        }}
      >
        <Grid item container xs={12} md={8} spacing={4}>
          <Grid container item>
            <Grid xs={12} item justifyContent="center" container>
              <Logo />
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <Box fontFamily="Archivo Black" fontSize="35px">
                BAGGERS
              </Box>
            </Grid>
          </Grid>
          <form>{children}</form>
        </Grid>
      </Grid>
    </CentredPaper>
  );
};
