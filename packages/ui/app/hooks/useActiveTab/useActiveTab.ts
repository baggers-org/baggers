import { useLocation } from "@remix-run/react";

export const useActiveTab = () => {
  const { pathname } = useLocation();
  return `/${pathname.split(`/`)[1]}`;
};
