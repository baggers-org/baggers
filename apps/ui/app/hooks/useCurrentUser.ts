import { useRootData } from './useRootData';

export const useCurrentUser = () => {
  return useRootData()?.user;
};
