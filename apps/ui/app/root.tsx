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
import {
  NonFlashOfWrongThemeEls,
  ThemeProvider,
  useTheme,
} from './components/theme';
import { getThemeSession } from './cookies/theme.cookie';
import { isAuthenticated } from './server/policy.server';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './styles/app.css';
import { RootData } from './types/root-data';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Baggers',
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500&family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={clsx(
          'dark:bg-background-dark bg-background-light',
          'dark:text-text-dark text-text-light'
        )}
      >
        <Outlet />

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
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </ThemeProvider>
  );
}
