import { Button, Stack } from '@mui/material';
import { Form, useLoaderData, useNavigate } from '@remix-run/react';
import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from '@remix-run/server-runtime';
import {
  Portfolio,
  PortfoliosCreatedQuery,
  PortfolioSummary,
} from '@baggers/sdk';
import { useTranslation } from 'react-i18next';
import { Create, DriveFolderUpload, FileUpload } from '@mui/icons-material';
import { authenticatedSdk } from '~/graphql/sdk.server';
import { PortfolioCardList } from '~/components/PortfolioCardList';

export const loader: LoaderFunction = async ({ request }) => {
  const sdk = await authenticatedSdk(request);
  return sdk.portfoliosCreated();
};

export const meta: MetaFunction = () => ({
  title: `Baggers - Created portfolios`,
});

export const action: ActionFunction = async ({ request }) => {
  const headers = new Headers();
  const sdk = await authenticatedSdk(request, headers);
  const formData = await request.formData();
  const intent = formData.get(`intent`);

  if (intent === `delete`) {
    const _ids = formData.getAll(`portfolio`);
    await sdk.portfoliosRemoveMultiple({ _ids });
    return json({}, { headers });
  }

  if (intent === `create`) {
    const { portfoliosInitEmpty } = await sdk.portfoliosInitEmpty();
    return redirect(`/portfolios/${portfoliosInitEmpty._id}/holdings`, {
      headers,
    });
  }

  return json({ error: `method not supported ` }, { status: 405 });
};
export default function CreatedPortfoliosPage() {
  const data = useLoaderData<PortfoliosCreatedQuery>();

  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Form method="post">
      <Stack spacing={3}>
        <Stack direction="row" spacing={3}>
          <Button
            variant="contained"
            type="submit"
            name="intent"
            value="create"
            endIcon={<Create />}
          >
            {t(`create_portfolio`, `Create portfolio`)}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(`/portfolios/import`)}
            endIcon={<DriveFolderUpload />}
          >
            {t(`import_from_broker`, `Import from broker`)}
          </Button>
          <Button variant="outlined" endIcon={<FileUpload />}>
            {t(`upload_csv`, `Upload CSV`)}
          </Button>
        </Stack>
        <PortfolioCardList
          portfolios={data?.portfoliosCreated as PortfolioSummary[]}
        />
      </Stack>
    </Form>
  );
}