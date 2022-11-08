import React, { PropsWithChildren, useContext, useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useDataRefresh } from 'remix-utils';

export const useMarketDataRefresh = () => {
  const { refresh, state } = useDataRefresh();

  const { setIsRefreshing } = useContext(MarketDataRefreshContext);

  useEffect(() => {
    const interval = setInterval(refresh, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [refresh]);

  useEffect(() => {
    if (state === 'loading') {
      setIsRefreshing(true);
    } else {
      setIsRefreshing(false);
    }
  }, [state]);
};

export const MarketDataRefreshContext = React.createContext({
  isRefreshing: false,
  setIsRefreshing: (isRefreshing: boolean) => isRefreshing,
});

export const MarketDataRefreshProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const value = useMemo(
    () => ({
      isRefreshing,
      setIsRefreshing,
    }),
    [isRefreshing, setIsRefreshing]
  );

  return (
    <MarketDataRefreshContext.Provider value={value as any}>
      {children}
    </MarketDataRefreshContext.Provider>
  );
};
