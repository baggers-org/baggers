import { json, LoaderFunction } from '@remix-run/server-runtime';
import { baggersApiAuthenticator } from '~/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  try {
    console.log(`In callback`);

    const res = await baggersApiAuthenticator.authenticate(`auth0`, request, {
      successRedirect: `/portfolios/created`,
      throwOnError: true,
    });

    console.log(`Callback response `, res);
  } catch (e) {
    console.error(e);

    return json(
      { message: `There was an error authenticating` },
      { status: 500 },
    );
  }
};
