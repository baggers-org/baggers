import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import Logo from '../../../../public/Logo/LightLogoLarge.svg';
import CentredPaper from '../CentredPaper';

type Props = {};
const LoginFormWrapper: React.FC<Props> = ({ children }) => {
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
            <Grid xs={12} item justify="center" container>
              <Logo />
            </Grid>
            <Grid item xs={12} container justify="center">
              <Typography variant="h1" style={{ fontFamily: `Archivo Black` }}>
                BAGGERS
              </Typography>
            </Grid>
          </Grid>
          {children}
        </Grid>
      </Grid>
    </CentredPaper>
  );
};
export default LoginFormWrapper;
