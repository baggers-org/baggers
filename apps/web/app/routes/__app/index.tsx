import { CallToAction } from '~/components';
import { DashboardPage } from '~/components/DashboardPage';
import { useCurrentUser } from '~/hooks/useCurrentUser';

export default function WelcomePage() {
  console.log('In here ');

  const user = useCurrentUser();

  if (user) {
    return <DashboardPage />;
  }

  return <CallToAction />;
}
