import { json, LoaderFunction, redirect } from '@remix-run/node';
import type { ActionFunction } from '@remix-run/node';
import { isTheme } from '~/components/theme';
import { getThemeSession } from '~/cookies/theme.cookie';

export const loader: LoaderFunction = () => {
  return redirect('/', { status: 404 });
};

export const action: ActionFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const theme = form.get('theme');

  if (!isTheme(theme)) {
    return json({
      success: false,
      message: `theme value of ${theme} is not a valid theme`,
    });
  }

  themeSession.setTheme(theme);
  return json(
    { success: true },
    { headers: { 'Set-Cookie': await themeSession.commit() } }
  );
};
