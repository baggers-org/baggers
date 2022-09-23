import { useMatches } from '@remix-run/react';
import { Tokens } from '~/auth.server';
import { User } from '@baggers/graphql-types';
import { Onboarding } from '~/types/Onboarding';

export interface AppStore {
  user: (User & Tokens) | null;
  onboarding: Onboarding;
  url: string;
}
export const useAppStore = (): AppStore | undefined => {
  const matches = useMatches();
  const appStore = matches.find((m) => m.id === `routes/__app`);

  return appStore?.data as AppStore;
};
