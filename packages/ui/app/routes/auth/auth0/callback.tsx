import { json, LoaderFunction } from 'remix';
import { baggersApiAuthenticator } from '~/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  try {
    return baggersApiAuthenticator.authenticate(`auth0`, request, {
      successRedirect: `/portfolios/created`,
      throwOnError: true,
    });
  } catch (e) {
    console.error(e);

    return json(
      { message: `There was an error authenticating` },
      { status: 500 },
    );
  }
};
