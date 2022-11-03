import { Container, Divider, Paper, Stack } from '@mui/material';
import { ActionFunction, json, redirect } from '@remix-run/server-runtime';
import { validationError } from 'remix-validated-form';
import { DeletePortfolio } from '~/components/PortfolioSettings';
import { Privacy } from '~/components/PortfolioSettings/components/Privacy';
import { authenticatedSdk } from '~/graphql/sdk.server';
import { PortfolioPrivacyValidator } from '~/validation/portfolios/settings/PortfolioPrivacy.schema';

export const action: ActionFunction = async ({ request, params }) => {
  const headers = new Headers();
  const sdk = await authenticatedSdk(request);

  const formData = await request.formData();

  const subaction = formData.get('subaction');

  if (subaction === 'privacy') {
    const { data, error } = await PortfolioPrivacyValidator.validate(formData);

    if (error) return validationError(error);

    return await sdk.portfoliosUpdateOne({
      _id: params.id,
      input: {
        private: data.private,
      },
    });
  }

  if (request.method === `DELETE`) {
    await sdk.portfoliosRemoveOne({ _id: params.id });

    return redirect(`/portfolios/created`, { headers });
  }

  return json({ error: `not support` }, { status: 405 });
};
export default function PortfolioSettings() {
  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3 }}>
        <Stack sx={{ width: '100%' }} spacing={6}>
          <Privacy />
          <Divider />
          <DeletePortfolio />
        </Stack>
      </Paper>
    </Container>
  );
}
