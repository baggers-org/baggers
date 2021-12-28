import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

type Props = {
  // If no current user, redirect to this route
  redirectTo?: string;
};
export const useCurrentUser = ({ redirectTo }: Props = {}): any => {
  const { push } = useRouter();
  const [user, setUser] = useState();
  useEffect(() => {
    async function checkAuth() {
      setUser(await Auth.currentAuthenticatedUser());
    }
    checkAuth().catch(() => {
      if (redirectTo) {
        push(`/login`);
      }
    });
  }, []);

  return user;
};
