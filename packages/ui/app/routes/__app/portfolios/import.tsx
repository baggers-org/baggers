import { CircularProgress } from '@mui/material';
import { useLoaderData, useSubmit } from '@remix-run/react';
import { ActionFunction, LoaderFunction } from '@remix-run/server-runtime';
import { useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { PlaidCreateLinkTokenMutation } from '~/generated/graphql';
import { sdk } from '~/graphql/sdk.server';

export const action: ActionFunction = async ({ request }) => {
  const { public_token } = Object.fromEntries(await request.formData());
  return sdk.plaidImportPortfolios({
    input: { public_token: public_token.toString() },
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  return sdk.plaidCreateLinkToken();
};
export default function ImportPortfolios() {
  const {
    plaidCreateLinkToken: { link_token },
  } = useLoaderData<PlaidCreateLinkTokenMutation>();

  const submit = useSubmit();
  const { open, ready } = usePlaidLink({
    token: link_token,
    onSuccess: (public_token) => {
      submit({ public_token }, { method: `post` });
    },
  });

  useEffect(() => {
    if (ready) {
      open();
    }
  }, [ready]);

  return <CircularProgress />;
}
