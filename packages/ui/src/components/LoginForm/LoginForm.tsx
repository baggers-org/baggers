import React, { useState, useEffect } from 'react';
import { Grid, Button, Box, Typography } from '@mui/material';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

import theme from '@/styles/theme';
import { useNotifications } from '@/hooks';
import {
  BaggersButton,
  BaggersButtonProps,
  BaggersTextField,
  ChangePasswordForm,
  ConfirmEmailForm,
  LoginFormWrapper,
} from '@/components';

type Props = {};
export type LoginError = {
  __type?: string;
  message: string;
};
export const LoginForm: React.FC<Props> = () => {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<LoginError | null>(null);
  const [forceChangePasswordForUser, setForceChangePasswordForuser] = useState(
    null,
  );
  const [showConfirmEmail, setShowConfirmEmail] = useState(false);
  const [newPassword, setNewPassword] = useState<string | undefined>();
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>();

  const { push } = useRouter();
  const { sendNotification } = useNotifications();

  useEffect(() => {
    if (loginError?.message) {
      sendNotification({
        message: loginError.message,
        type: `error`,
      });
    }
  }, [loginError]);

  const onClickLogin: BaggersButtonProps['onClick'] = async (e) => {
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
        push(`/portfolios/created`);
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
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <Box padding={3} textAlign="center">
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
            color="primary"
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
        <Grid container item spacing={2} mt={1}>
          <Grid item xs={12}>
            <BaggersButton
              loading={loggingIn}
              color="secondary"
              onClick={onClickLogin}
              type="submit"
            >
              {!loggingIn ? `Login` : `Logging in...`}
            </BaggersButton>
          </Grid>
          <Grid item xs={12} container justifyContent="center">
            <BaggersButton variant="contained" onClick={() => push(`/signup`)}>
              Create account
            </BaggersButton>
          </Grid>
          <Grid item xs={12} container justifyContent="center">
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
