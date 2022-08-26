import { useAppStore } from './useAppStore';

export const useUrl = () => {
  return useAppStore()?.url;
};
