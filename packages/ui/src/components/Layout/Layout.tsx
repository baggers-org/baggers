import * as React from 'react';
import { AppBar } from '@/components/AppBar';

export const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <AppBar>{children}</AppBar>
    </div>
  );
};
