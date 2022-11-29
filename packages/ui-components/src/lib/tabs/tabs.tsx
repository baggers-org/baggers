import { Tab } from '@headlessui/react';
import { TabsProps } from './tabs.props';

export function Tabs({
  selectedIndex,
  defaultIndex,
  children,
}: TabsProps) {
  return (
    <Tab.Group
      defaultIndex={defaultIndex || 0}
      selectedIndex={selectedIndex}
    >
      <Tab.List>{children}</Tab.List>
    </Tab.Group>
  );
}
