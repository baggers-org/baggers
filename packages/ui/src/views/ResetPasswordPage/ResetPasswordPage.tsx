import BaggersTextField from '@/components/BaggersTextField/BaggersTextField';
import LoginFormWrapper from '@/components/util/LoginFormWrapper';
import theme from '@/styles/theme';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { Auth } from 'aws-amplify';
import { useState, useEffect } from 'react';

import { BaggersPageComponent } from '../types';

type Props = {};
const ResetPasswordPage: BaggersPageComponent<Props> = () => {
  const [email, setEmail] = useState<string | undefined>();
  const startForgotPassword = async () => {
    if (!email) return;
    const res = await Auth.forgotPassword(email);
    console.log(res);
  };
  return (
    <Container maxWidth="sm">
      <LoginFormWrapper>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={8} container justify="center">
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

export default ResetPasswordPage;
