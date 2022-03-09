import { ActionFunction, LoaderFunction, redirect } from '@remix-run/server-runtime';
import { baggersApiAuthenticator } from '~/auth.server';

export const loader: LoaderFunction = () => redirect(`/`);

export const action: ActionFunction = ({ request }) =>
  baggersApiAuthenticator.authenticate(`auth0`, request);
