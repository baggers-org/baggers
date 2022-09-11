import React, { PropsWithChildren, useContext, useMemo, useState } from 'react';

export const SidebarContext = React.createContext({
  isExpanded: true,
  setIsExpanded: (expanded: boolean) => {
    //
    return expanded;
  },
});

export const SidebarProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const state = useMemo(() => {
    return {
      isExpanded,
      setIsExpanded,
    };
  }, [isExpanded, setIsExpanded]);

  return (
    <SidebarContext.Provider value={state}>{children}</SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};
