import React from 'react';
import { Container } from '@mui/material';

import { useCurrentUser } from '@/hooks';

type Props = {};

const PortfoliosPage: React.FC<Props> = () => {
  useCurrentUser({
    redirectTo: `/login`,
  });

  return <Container maxWidth="xl">Placeholder</Container>;
};
export default PortfoliosPage;
