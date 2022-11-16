import { useLocation } from '@remix-run/react';

export const useActiveNavbarTab = () => {
  const { pathname } = useLocation();
  return `/${pathname.split(`/`)[1]}`;
};
