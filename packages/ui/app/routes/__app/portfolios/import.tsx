import { Box, Typography } from '@mui/material';
import { useLoaderData, useSubmit } from '@remix-run/react';
import {
  ActionFunction,
  LoaderFunction,
  redirect,
} from '@remix-run/server-runtime';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePlaidLink } from 'react-plaid-link';
import { BaggersStepper } from '~/components/BaggersStepper/BaggersStepper';
import { CentredPaper } from '~/components/Layouts/CentredPaper';
import { LoadingLogo } from '~/components/LoadingLogo/LoadingLogo';
import { PlaidCreateLinkTokenMutation } from '~/generated/graphql';
import { sdk } from '~/graphql/sdk.server';
import { Loading } from '~/components/Loading';

export const action: ActionFunction = async ({ request }) => {
  const { public_token } = Object.fromEntries(await request.formData());
  const { plaidImportPortfolios } = await sdk.plaidImportPortfolios({
    input: { public_token: public_token.toString() },
  });

  if (plaidImportPortfolios.ok) {
    return redirect(`/portfolios/created`);
  }

  throw Error(`There was an error importing your portfolios. Please try again`);
};

export const loader: LoaderFunction = async () => {
  return sdk.plaidCreateLinkToken();
};
export default function ImportPortfolios() {
  const {
    plaidCreateLinkToken: { link_token },
  } = useLoaderData<PlaidCreateLinkTokenMutation>();

  const { t } = useTranslation();
  const submit = useSubmit();
  const [step, setStep] = useState(0);
  const { open, ready } = usePlaidLink({
    token: link_token,
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
