import {
  Headers,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { Navbar } from './components/Navbar';
import { useRootData } from './hooks/useRootData';
import { isAuthenticated } from './server/policy.server';

import styles from './styles/app.css';
import { RootData } from './types/root-data';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<RootData> => {
  const headers = new Headers();
  const user = await isAuthenticated(request, headers);

  return {
    user,
  };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="dark:bg-background-dark bg-background-light dark:text-text-dark text-text-light">
        <div className="flex place-content-center">
          <Navbar
            options={[
              {
                key: '/',
                label: 'Home',
                to: '/',
              },
              {
                key: '/portfolios',
                label: 'Portfolio',
                to: '/portfolios/created',
              },
              {
                key: '/news',
                label: 'News',
                to: '/news',
              },
              {
                key: '/discover',
                label: 'Discover',
                to: '/discover',
              },
            ]}
          />
        </div>
        <div className="pt-32">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
