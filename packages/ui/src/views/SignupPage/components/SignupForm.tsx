import { useState } from 'react';
import { PersonOutlined, EmailOutlined } from '@mui/icons-material';
import { Button, Container } from '@mui/material';
import { Auth } from 'aws-amplify';
import { useTranslation } from 'next-i18next';

import { ChangePasswordForm, ConfirmEmailForm } from '@/components';
import { useNotifications, usePrefetch } from '@/hooks';
import { useRouter } from 'next/router';
import { SignupPageTextField } from '.';

export const SignupForm = () => {
  const [firstName, setFirstName] = useState<string | undefined>();
  const [secondName, setSecondName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>();

  const { sendNotification } = useNotifications();

  const [showConfirmEmail, setShowConfirmEmail] = useState(false);
  const { t } = useTranslation(`signup`);
  const { push } = useRouter();
  usePrefetch(`/portfolios/created`);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      sendNotification({
        message: `Your passwords do not match`,
        type: `error`,
      });
      return;
    }
    if (!email || !password) return;
    try {
      await Auth.signUp({
        username: email,
        password,

        attributes: {
          name: firstName,
          family_name: secondName,
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
      <SignupPageTextField
        variant="filled"
        placeholder={t(`first_name`, `First name`)}
        InputProps={{
          startAdornment: <PersonOutlined />,
        }}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <SignupPageTextField
        variant="filled"
        placeholder={t(`second_name`, `Second name`)}
        InputProps={{
          startAdornment: <PersonOutlined />,
        }}
        onChange={(e) => setSecondName(e.target.value)}
      />
      <SignupPageTextField
        variant="filled"
        placeholder={t(`email`, `Email`)}
        onChange={(e) => setEmail(e.target.value)}
        InputProps={{
          startAdornment: <EmailOutlined />,
        }}
      />
      <ChangePasswordForm
        onChangeConfirmPassword={setConfirmPassword}
        onChangeNewPassword={setPassword}
      />

      <Button variant="contained" color="secondary" onClick={handleSignup}>
        {t(`sign_up`, `Sign Up`)}
      </Button>
      <Button variant="outlined" onClick={() => push(`/login`)}>
        {t(`have_an_account_login`, `Have an account? Login`)}
      </Button>
    </>
  );
};
