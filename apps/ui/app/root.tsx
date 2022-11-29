import { tlsx } from '@baggers/ui-components/src/util/clsx';
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
  useLoaderData,
} from '@remix-run/react';
import clsx from 'clsx';
import { Navbar } from './components/Navbar';
import {
  NonFlashOfWrongThemeEls,
  ThemeProvider,
  useTheme,
} from './components/theme';
import { getThemeSession } from './cookies/theme.cookie';
import { useNavbarOptions } from './hooks/useNavbarOptions';
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
  const themeSession = await getThemeSession(request);
  const user = await isAuthenticated(request, headers);

  return {
    user,
    theme: themeSession.getTheme(),
  };
};

export function App() {
  const [theme] = useTheme();
  const data = useLoaderData<RootData>();

  return (
    <html lang="en" className={clsx(theme, 'transition-colors')}>
      <head>
        <NonFlashOfWrongThemeEls ssrTheme={Boolean(data.theme)} />
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={tlsx(
          'dark:bg-background-dark bg-background-light',
          'dark:text-text-dark text-text-light',
          'px-12'
        )}
      >
        <div>
          <Navbar options={useNavbarOptions()} />
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function AppWithProvider() {
  const data = useLoaderData<RootData>();
  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  );
}
