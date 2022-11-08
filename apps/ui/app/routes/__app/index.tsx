import { Alert, AlertTitle, Container } from '@mui/material';
import { Stack } from '@mui/system';
import { CallToAction } from '~/components';
import { DashboardPage } from '~/components/DashboardPage';
import { useCurrentUser } from '~/hooks/useCurrentUser';

export default function WelcomePage() {
  const user = useCurrentUser();

  if (user) {
    return <DashboardPage />;
  }

  return (
    <Stack>
      <CallToAction />
      <Container maxWidth="xl" sx={{ mt: 10 }}>
        <Alert severity="info">
          <AlertTitle>
            This page is under development, please check back later
          </AlertTitle>
        </Alert>
      </Container>
    </Stack>
  );
}
