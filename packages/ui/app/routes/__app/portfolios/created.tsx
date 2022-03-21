import { Button, Grid, MenuItem, Stack } from '@mui/material';
import { BaggersSelect, PortfolioCard } from '~/components';
import { Form, useLoaderData, useNavigate } from '@remix-run/react';
import {
  ActionFunction,
  LoaderFunction,
  redirect,
} from '@remix-run/server-runtime';
import { MyPortfoliosSummaryQuery } from '~/generated/graphql';
import { sdk } from '~/graphql/sdk.server';
import { authenticated } from '~/policy.server';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { Create, DriveFolderUpload, FileUpload } from '@mui/icons-material';

export const loader: LoaderFunction = async ({ request }) => {
  return authenticated(request, () => {
    return sdk.myPortfoliosSummary();
  });
};

export const action: ActionFunction = async () => {
  const { createPortfolio } = await sdk.createPortfolio();

  return redirect(`/portfolios/${createPortfolio.record._id}/holdings`);
};
export default function CreatedPortfoliosPage() {
  const data = useLoaderData<MyPortfoliosSummaryQuery>();

  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <>
      <Stack direction="row">
        <Form method="post">
          <Stack direction="row" spacing={3}>
            <Button variant="contained" type="submit" endIcon={<Create />}>
              {t(`create_portfolio`, `Create portfolio`)}
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate(`/portfolios/import`)}
              endIcon={<DriveFolderUpload />}
            >
              {t(`import_from_broker`, `Import From Broker`)}
            </Button>
            <Button variant="contained" endIcon={<FileUpload />}>
              {t(`upload_csv`, `Upload CSV`)}
            </Button>
          </Stack>
        </Form>
        <Box ml="auto" width="200px">
          <BaggersSelect
            label={t(`show`, `Show`)}
            id="show-portfolios-filter"
            value="all"
            size="small"
          >
            <MenuItem value="all">{t(`all`, `All`)}</MenuItem>
            <MenuItem value="public">{t(`public`, `Public`)}</MenuItem>
            <MenuItem value="private">{t(`private`, `Private`)}</MenuItem>
          </BaggersSelect>
        </Box>
      </Stack>
      <Grid container gap={3} pl={0}>
        {data?.myPortfolios?.map((portfolio) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            xl={3}
            key={portfolio._id}
            p={0}
          >
            <PortfolioCard portfolio={portfolio} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
