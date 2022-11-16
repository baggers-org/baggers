import { createCookieSessionStorage } from '@remix-run/node';
import { env } from './env';

// export the whole sessionStorage object
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: `_session`,
    sameSite: `lax`, // this helps with CSRF
    path: `/`,
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: [env.AUTH0_SECRET],
    secure: env.NODE_ENV === `production`,
  },
});

// you can also export the methods individually for your own usage
export const { getSession, commitSession, destroySession } =
  sessionStorage;
