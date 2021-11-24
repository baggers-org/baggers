import { BaggersTextField, LoginFormWrapper } from '@/components';
import { Button, Container, Grid, Typography } from '@mui/material';
import { Auth } from 'aws-amplify';
import React, { useState } from 'react';

import { BaggersPageComponent } from '../types';

type Props = {};

export const ResetPasswordPage: BaggersPageComponent<Props> = () => {
  const [email, setEmail] = useState<string | undefined>();

  const startForgotPassword = async () => {
    if (!email) return;
    await Auth.forgotPassword(email);
  };

  return (
    <Container maxWidth="sm">
      <LoginFormWrapper>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={8} container justifyContent="center">
            <Typography>Send password reset link to:</Typography>
          </Grid>
          <Grid item xs={12}>
            <BaggersTextField
              variant="outlined"
              fullWidth
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={startForgotPassword}
              disabled={!email}
              color="secondary"
              variant="contained"
              fullWidth
            >
              Send email
            </Button>
          </Grid>
        </Grid>
      </LoginFormWrapper>
    </Container>
  );
};
