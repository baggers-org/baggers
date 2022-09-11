import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

export interface SubMenuOption {
  label: string;
  icon?: any;
  href: string;
}
export const SidebarContext = React.createContext<{
  isExpanded: boolean;
  setIsExpanded?: Dispatch<SetStateAction<boolean>>;
}>({
  isExpanded: true,
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
