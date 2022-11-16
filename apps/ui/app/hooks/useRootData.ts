import { useMatches } from '@remix-run/react';
import { RootData } from '~/types/root-data';

export const useRootData = (): RootData | undefined => {
  return useMatches().find((m) => m.id === 'root')?.data as RootData;
};
