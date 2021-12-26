import React, { useState } from 'react';
import theme from '@/styles/theme';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { Auth } from 'aws-amplify';

import {
  BaggersTextField,
  ChangePasswordForm,
  ConfirmEmailForm,
} from '@/components';
import { useNotifications, usePrefetch } from '@/hooks';
import { BaggersPageComponent } from '../types';

type Props = {};
const SignupPage: BaggersPageComponent<Props> = () => {
  const [firstName, setFirstName] = useState<string | undefined>();
  const [secondName, setSecondName] = useState<string | undefined>();
  const [username, setUsername] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>();

  const { sendNotification } = useNotifications();

  const [showConfirmEmail, setShowConfirmEmail] = useState(false);

  usePrefetch(`/portfolios`);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      sendNotification({
        message: `Your passwords do not match`,
        type: `error`,
      });
      return;
    }
    if (!email || !password || !username) return;
    try {
      await Auth.signUp({
        username: email,
        password,

        attributes: {
          name: firstName,
          family_name: secondName,
          preferred_username: username,
        },
      });

      setShowConfirmEmail(true);
    } catch (e: any) {
      sendNotification({
        message: e?.message || `An error ocurred`,
        type: `error`,
      });
    }
  };

  if (showConfirmEmail && email && password) {
    return (
      <Container maxWidth="sm">
        <ConfirmEmailForm email={email} password={password} />
      </Container>
    );
  }
  return (
    <>
      <Box bgcolor="black" padding="50px" display="flex">
        <Box>
          <Typography
            variant="h1"
            style={{
              fontFamily: `Archivo Black`,
              color: `white`,
              display: `flex`,
              alignItems: `center`,
              gap: `5px`,
            }}
          >
            SIGN UP TO BAGGERS
            <Box
              bgcolor={theme.palette.error.main}
              padding="4px"
              borderRadius="4px"
              fontSize="17px"
            >
              BETA
            </Box>
          </Typography>
        </Box>
      </Box>
      <Box marginTop="20px">
        <Container maxWidth="sm">
          <Box padding="20px">
            <Grid container spacing={2} direction="column">
              <Grid item>
                <Typography variant="h2">PROFILE BASICS</Typography>
              </Grid>
              <Grid item>
                <BaggersTextField
                  label="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item>
                <BaggersTextField
                  label="Second Name"
                  onChange={(e) => setSecondName(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Divider />
              </Grid>
              <Grid item>
                <BaggersTextField
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item>
                <BaggersTextField
                  label="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Divider />
              </Grid>
              <Grid item>
                <ChangePasswordForm
                  onChangeNewPassword={setPassword}
                  onChangeConfirmPassword={setConfirmPassword}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={handleSignup}
                >
                  Sign up
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default SignupPage;
