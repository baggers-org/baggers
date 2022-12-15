import { ActionFunction } from '@remix-run/node';
import { useCurrentUser } from '~/hooks/useCurrentUser';
import { Dashboard } from '~/pages/dashboard/dashboard';
import { LandingPage } from '~/pages/landing/landing-page';
import { unauthenticatedSdk } from '~/server/sdk.server';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  if (formData.get('intent') === 'addAlphaTesterEmail') {
    const email = formData.get('email')?.toString();
    if (!email) return;
    const sdk = await unauthenticatedSdk(request);
    const res = await sdk
      .addAlphaTesterEmail({
        email,
      })
      .catch(() => {
        console.error(email, 'attempted to sign up again');
        return {
          addAlphaTesterEmail: {
            _id: email,
          },
        };
      });

    return res;
  }
};
export default function Index() {
  const user = useCurrentUser();

  if (user) {
    return <Dashboard />;
  }

  return <LandingPage />;
}
