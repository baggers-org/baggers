import LoginForm from '@/components/LoginForm/LoginForm';
import usePrefetch from '@/hooks/usePrefetch/usePrefetch';
import { Container, Typography } from '@material-ui/core';
import { BaggersPageComponent } from '../types';

type Props = {};

const LoginPage: BaggersPageComponent<Props> = () => {
  usePrefetch(`/portfolios`);
  return (
    <Container maxWidth="sm">
      <LoginForm />
      <div
        style={{
          position: `absolute`,
          left: `50%`,
          transform: `translateX(-50%)`,
          bottom: 20,
        }}
      >
        <Typography color="textSecondary">&copy; 2021 Baggers</Typography>
        <Typography>
          Last built{` `}
          <strong>{process.env.NEXT_PUBLIC_BUILD_TIME || `now`}</strong>
        </Typography>
      </div>
    </Container>
  );
};

export default LoginPage;
