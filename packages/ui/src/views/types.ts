import React from 'react';

export type ClientAuthRouteConfig = {
  // Route to redirect to on auth fail
  redirectTo: string;
};
export type BaggersPageStatics = {
  /**
   * If true will not display the app navigation bar at the top
   */
  withoutAppBar?: boolean;

  /**
   * Setup this page component as a client authenticated route, meaning
   * an auth check will be performed on the client and if it fails
   * the user will be redirected. This is useful for allowing a page
   * to be static, but also providing an auth redirect
   */
  clientAuthenticatedRouteConfig?: ClientAuthRouteConfig;
};
export type BaggersPageComponent<TProps> = React.FC<TProps> &
  BaggersPageStatics;
