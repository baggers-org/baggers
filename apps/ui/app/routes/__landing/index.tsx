import { useCurrentUser } from '~/hooks/useCurrentUser';
import { Dashboard } from '~/pages/dashboard/dashboard';
import { LandingPage } from '~/pages/landing/landing-page';

export default function Index() {
  const user = useCurrentUser();

  if (user) {
    return <Dashboard />;
  }

  return <LandingPage />;
}
