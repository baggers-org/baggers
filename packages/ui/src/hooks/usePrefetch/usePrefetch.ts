import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const usePrefetch = (route: string) => {
  const { prefetch } = useRouter();
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!fetched) {
      prefetch(route);
      setFetched(true);
    }
  }, [route]);
};

export default usePrefetch;
