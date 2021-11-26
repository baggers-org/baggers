import { Container } from '@mui/material';

import LoginForm from '@/components/LoginForm/LoginForm';
import { usePrefetch } from '@/hooks';
import { BaggersPageComponent } from '../types';

type Props = {};

export const LoginPage: BaggersPageComponent<Props> = () => {
  usePrefetch(`/signup`);
  usePrefetch(`/reset_password`);
  usePrefetch(`/portfolios`);

  return (
    <Container maxWidth="sm">
      <LoginForm />
    </Container>
  );
};
