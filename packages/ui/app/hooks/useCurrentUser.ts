import { useMatches } from '@remix-run/react';

export const useCurrentUser = () => {
  const matches = useMatches();

  return matches.find((m) => m.id === `routes/__app`)?.data;
};
