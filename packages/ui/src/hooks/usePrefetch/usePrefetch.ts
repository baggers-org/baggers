import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const usePrefetch = (route: string) => {
  const { prefetch } = useRouter();
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!fetched) {
      prefetch(route);
      setFetched(true);
    }
  }, [route]);
};
