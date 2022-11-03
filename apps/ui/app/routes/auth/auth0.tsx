import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from '@remix-run/server-runtime';
import { baggersApiAuthenticator } from '~/auth.server';

export const loader: LoaderFunction = () => redirect(`/`);

export const action: ActionFunction = ({ request }) => {
  try {
    return baggersApiAuthenticator.authenticate(`auth0`, request, {
      throwOnError: true,
    });
  } catch (e) {
    console.error(e);
    return json(
      { message: `There was an error authenticating the user` },
      { status: 500 }
    );
  }
};
