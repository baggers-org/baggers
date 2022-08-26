import { PlaidLinkTokenQuery } from '@baggers/sdk';
import { Box } from '@mui/material';
import { useLoaderData, useSubmit } from '@remix-run/react';
import {
  ActionFunction,
  LoaderFunction,
  redirect,
} from '@remix-run/server-runtime';
import { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { BaggersStepper } from '~/components/BaggersStepper/BaggersStepper';
import { authenticatedSdk } from '~/graphql/sdk.server';

export const action: ActionFunction = async ({ request }) => {
  const headers = new Headers();
  const sdk = await authenticatedSdk(request, headers);
  const publicToken = (await request.formData())
    .get('public_token')
    ?.toString();

  if (!publicToken)
    throw Error(
      `There was an error importing your portfolios. Please try again`
    );

  const { portfoliosBeginImport } = await sdk.portfoliosBeginImport({
    publicToken,
  });

  if (portfoliosBeginImport.importedIds) {
    return redirect(`/portfolios/created`, { headers });
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const sdk = await authenticatedSdk(request);
  return sdk.plaidLinkToken();
};
export default function ImportPortfolios() {
  const { plaidLinkToken } = useLoaderData<PlaidLinkTokenQuery>();

  const submit = useSubmit();
  const [step, setStep] = useState(0);
  const { open, ready } = usePlaidLink({
    token: plaidLinkToken,
    onSuccess: (public_token) => {
      setStep(2);
      submit({ public_token }, { method: `post` });
    },
  });

  useEffect(() => {
    if (ready) {
      open();
    }
  }, [ready]);

  return (
    <Box
      position="relative"
      display="flex"
      width="100%"
      height="50vh"
      alignItems="center"
    >
      <Box width="100%">
        <BaggersStepper
          steps={[
            `Connecting to plaid`,
            `Enter credentials`,
            `Importing portfolios`,
          ]}
          activeStep={step}
        />
      </Box>
    </Box>
  );
}
