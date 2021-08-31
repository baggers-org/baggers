import * as React from 'react';
import Menu from './Header/Menu/Menu';

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Menu>{children}</Menu>
    </div>
  );
};

export const withAppBar = (WrappedComponent: any) => (props: any) => (
  <Layout>
    <WrappedComponent {...props} />
  </Layout>
);
export default Layout;
