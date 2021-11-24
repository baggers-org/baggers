import { Container, Typography } from '@mui/material';

import LoginForm from '@/components/LoginForm/LoginForm';
import { usePrefetch } from '@/hooks';
import { BaggersPageComponent } from '../types';

type Props = {};

export const LoginPage: BaggersPageComponent<Props> = () => {
  usePrefetch(`/portfolios`);
  return (
    <Container maxWidth="sm">
      <LoginForm />
      <Typography color="textSecondary">&copy; 2021 Baggers</Typography>
    </Container>
  );
};
