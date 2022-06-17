import { Container, Paper } from '@mui/material';
import { ActionFunction, json, redirect } from '@remix-run/server-runtime';
import { DeletePortfolio } from '~/components/PortfolioSettings';
import { authenticatedSdk } from '~/graphql/sdk.server';

export const action: ActionFunction = async ({ request, params }) => {
  const headers = new Headers();
  const sdk = await authenticatedSdk(request);

  if (request.method === `DELETE`) {
    await sdk.deletePortfolio({ id: params.id });

    return redirect(`/portfolios/created`, { headers });
  }

  return json({ error: `not support` }, { status: 405 });
};
export default function PortfolioSettings() {
  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3 }}>
        <DeletePortfolio />
      </Paper>
    </Container>
  );
}
