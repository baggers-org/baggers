import useNotifications from '@/hooks/useNotifications/useNotifications';
import { Box, Grid, Typography } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useState } from 'react';
import BaggersButton from '../BaggersButton/BaggersButton';
import BaggersTextField from '../BaggersTextField/BaggersTextField';

import LoginFormWrapper from '../util/LoginFormWrapper';

type Props = {
  email: string;
  password: string;
};
const ConfirmEmailForm: React.FC<Props> = ({ email, password }) => {
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
    } catch (e) {
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
export default ConfirmEmailForm;
