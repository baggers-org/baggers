import React, { ReactElement, ReactNode } from 'react';

export type ClientAuthRouteConfig = {
  // Route to redirect to on auth fail
  redirectTo: string;
};
export type BaggersPageStatics = {
  /**
   * Define the react component to use as the page layout
   */
  getLayout?: (page: ReactElement) => ReactNode;

  /**
   * Setup this page component as a client authenticated route, meaning
   * an auth check will be performed on the client and if it fails
   * the user will be redirected. This is useful for allowing a page
   * to be static, but also providing an auth redirect
   */
  clientAuthenticatedRouteConfig?: ClientAuthRouteConfig;
};
export type BaggersPageComponent<TProps = void> = React.FC<TProps> &
  BaggersPageStatics;
