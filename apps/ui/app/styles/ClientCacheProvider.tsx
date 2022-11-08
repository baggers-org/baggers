import { useMemo, useState } from 'react';
import { CacheProvider } from '@emotion/react';

import ClientStyleContext from './ClientStyleContext';
import { createEmotionCache } from './createEmotionCache';

interface ClientCacheProviderProps {
  children: React.ReactNode;
}
export function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(createEmotionCache());

  const reset = () => {
    setCache(createEmotionCache());
  };

  const value = useMemo(
    () => ({
      reset,
    }),
    [],
  );

  return (
    <ClientStyleContext.Provider value={value}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}
