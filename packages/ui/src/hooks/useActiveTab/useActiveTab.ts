import { useRouter } from 'next/router';

export const useActiveTab = () => {
  const { pathname } = useRouter();
  return `/${pathname.split(`/`)[1]}`;
};
