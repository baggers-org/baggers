import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Grid, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { Auth } from 'aws-amplify';

import { useNotifications } from '@/hooks';
import {
  BaggersButton,
  BaggersTextField,
  LoginFormWrapper,
} from '@/components';

export type ConfirmEmailFormProps = {
  email: string;
  password: string;
};
export const ConfirmEmailForm: React.FC<ConfirmEmailFormProps> = ({
  email,
  password,
}) => {
  const [resending, setResending] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [code, setCode] = useState<string | undefined>();

  const { sendNotification } = useNotifications();

  const resendEmail = async () => {
    setResending(true);
    try {
      await Auth.resendSignUp(email);
      sendNotification({
        message: `Email sent!`,
        type: `success`,
      });
    } catch (e) {
      sendNotification({
        message: `An error occurred please try again later.`,
        type: `error`,
      });
    }

    setResending(false);
  };

  const { push } = useRouter();
  const sendCode = async () => {
    if (!code || !email || !password) return;

    setSubmitting(true);

    try {
      await Auth.confirmSignUp(email, code);

      await Auth.signIn({
        username: email,
        password,
      });

      push(`/portfolios`);
    } catch (e: any) {
      sendNotification({
        message: e.message || `There was an error. Please try again`,
        type: `error`,
      });
    }

    setSubmitting(false);
  };
  return (
    <LoginFormWrapper>
      <Box padding="20px">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography align="center">
              An email has been sent to <strong>{email}</strong>.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center">
              Please enter the code contained in the email to finish your signup
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <BaggersTextField
              label="Code"
              placeholder="- - - - - -"
              onChange={(e) => setCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <BaggersButton
              loading={submitting}
              onClick={sendCode}
              disabled={!code}
            >
              Verify Email
              <EmailIcon />
            </BaggersButton>
          </Grid>
          <Grid item xs={12}>
            <BaggersButton loading={resending} onClick={resendEmail}>
              Resend email
              <EmailIcon />
            </BaggersButton>
          </Grid>
        </Grid>
      </Box>
    </LoginFormWrapper>
  );
};
