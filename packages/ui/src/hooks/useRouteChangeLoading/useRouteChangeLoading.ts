import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useRouteChangeLoading = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.events.on(`routeChangeStart`, () => {
      setLoading(true);
    });

    router.events.on(`routeChangeComplete`, () => {
      setLoading(false);
    });
    router.events.on(`routeChangeError`, () => {
      setLoading(false);
    });
  }, []);

  return loading;
};
