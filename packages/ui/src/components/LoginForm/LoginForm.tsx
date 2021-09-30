import useNotifications from '@/hooks/useNotifications/useNotifications';
import theme from '@/styles/theme';
import { Grid, Button, Box, Typography } from '@material-ui/core';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import BaggersButton from '../BaggersButton/BaggersButton';

import BaggersTextField from '../BaggersTextField/BaggersTextField';
import ChangePasswordForm from '../ChangePasswordForm/ChangePasswordForm';
import ConfirmEmailForm from '../ConfirmEmailForm';
import LoginFormWrapper from '../util/LoginFormWrapper';

type Props = {};
type LoginError = {
  __type?: string;
  message: string;
};
const LoginForm: React.FC<Props> = () => {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const { push, prefetch } = useRouter();

  const [loggingIn, setLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<LoginError | null>(null);

  const [forceChangePasswordForUser, setForceChangePasswordForuser] = useState(
    null,
  );

  const [showConfirmEmail, setShowConfirmEmail] = useState(false);

  const { sendNotification } = useNotifications();

  useEffect(() => {
    prefetch(`/signup`);
    prefetch(`/reset_password`);
    prefetch(`/portfolios`);
  }, []);

  useEffect(() => {
    if (loginError?.message) {
      sendNotification({
        message: loginError.message,
        type: `error`,
      });
    }
  }, [loginError]);

  const handleLogin = async (e: Event) => {
    e.preventDefault();
    if (email && password) {
      setLoggingIn(true);
      try {
        const res = await Auth.signIn(email, password);
        setLoggingIn(false);

        if (res?.challengeName === `NEW_PASSWORD_REQUIRED`) {
          setForceChangePasswordForuser(res);
          return;
        }
        if (!res?.attributes?.email_verified) {
          setLoginError({
            message: `Email not verified - check your inbox to finish signing up`,
          });
          return;
        }
        // TODO: return user to the page they were on
        push(`/portfolios`);
      } catch (error: any) {
        setLoggingIn(false);

        if (error.code === `UserNotConfirmedException`) {
          setShowConfirmEmail(true);
          return;
        }
        setLoginError(error);
      }
    }
  };

  const [newPassword, setNewPassword] = useState<string | undefined>();
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>();

  const changePassword = async () => {
    if (!newPassword) return;
    if (newPassword !== confirmPassword) {
      setLoginError({
        message: `Your confirm password does not match your new password`,
      });
      return;
    }
    try {
      const res = await Auth.completeNewPassword(
        forceChangePasswordForUser,
        newPassword,
      );
      if (res.username) {
        sendNotification({
          message: `Password updated!`,
          type: `success`,
        });
        push(`/portfolios`);
      }
    } catch (e) {
      sendNotification({
        message: `Session is expired. Please refresh and try again`,
        type: `error`,
      });
    }
  };

  if (showConfirmEmail && email && password) {
    return <ConfirmEmailForm email={email} password={password} />;
  }
  if (forceChangePasswordForUser) {
    return (
      <LoginFormWrapper>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12}>
            <Box padding="20px" textAlign="center">
              <Typography variant="subtitle1">
                <strong>
                  You must change your password before you can log in
                </strong>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <ChangePasswordForm
              onChangeNewPassword={setNewPassword}
              onChangeConfirmPassword={setConfirmPassword}
            />
          </Grid>
          <Grid item xs={12}>
            <BaggersTextField
              label="Confirm Password"
              secret
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              disabled={!newPassword || !confirmPassword}
              onClick={changePassword}
            >
              Change password
            </Button>
          </Grid>
        </Grid>
      </LoginFormWrapper>
    );
  }
  return (
    <LoginFormWrapper>
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={12}>
          <BaggersTextField
            id="email"
            variant="outlined"
            type="email"
            autoComplete="email"
            label="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <BaggersTextField
            id="password"
            variant="outlined"
            label="Password"
            type="password"
            autoComplete="password"
            secret
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Grid>
        <Grid container item spacing={2} style={{ marginTop: `20px` }}>
          <Grid item xs={12}>
            <BaggersButton
              loading={loggingIn}
              onClick={handleLogin}
              type="submit"
            >
              {!loggingIn ? `Login` : `Logging in...`}
            </BaggersButton>
          </Grid>
          <Grid item xs={12} container justify="center">
            <BaggersButton color="primary" onClick={() => push(`/signup`)}>
              Create account
            </BaggersButton>
          </Grid>
          <Grid item xs={12} container justify="center">
            <Button
              style={{ color: theme.palette.action.focus }}
              fullWidth
              onClick={() => push(`/reset_password`)}
            >
              Reset password
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </LoginFormWrapper>
  );
};
export default LoginForm;
