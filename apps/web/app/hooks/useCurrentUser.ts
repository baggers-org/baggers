import { useMatches } from '@remix-run/react';
import { User } from '@baggers/graphql-types';

export const useCurrentUser = (): User | undefined => {
  const matches = useMatches();

  return matches.find((m) => m.id === `routes/__app`)?.data?.user as User;
};
