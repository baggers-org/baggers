import { createCookieSessionStorage } from '@remix-run/node';
import { isTheme, Theme } from '~/components/theme';
import { env } from '~/env/env';

export const themeStorage = createCookieSessionStorage({
  cookie: {
    name: 'theme',
    path: `/`,
    httpOnly: true,
    secrets: [env.AUTH0_SECRET],
    secure: true,
  },
});

export async function getThemeSession(request: Request) {
  const session = await themeStorage.getSession(
    request.headers.get('Cookie')
  );
  return {
    getTheme: () => {
      const themeValue = session.get('theme');
      console.log(themeValue);

      return isTheme(themeValue) ? themeValue : null;
    },
    setTheme: (theme: Theme) => session.set('theme', theme),
    commit: () => themeStorage.commitSession(session),
  };
}
