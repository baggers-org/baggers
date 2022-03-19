import {
  Button,
  Divider,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import {
  BaggersSelect,
  CreatePortfolioCard,
  PortfolioCard,
} from '~/components';
import { Form, useLoaderData, useNavigate } from '@remix-run/react';
import {
  ActionFunction,
  LoaderFunction,
  redirect,
} from '@remix-run/server-runtime';
import { MyPortfoliosSummaryQuery } from '~/generated/graphql';
import { sdk } from '~/graphql/sdk.server';
import { authenticated } from '~/policy.server';
import { ImportPortfoliosCard } from '~/components/ImportPortfoliosCard';
import { useTranslation } from 'react-i18next';
import { PortfoliosLayout } from '~/components/Layouts/PortfoliosLayout';
import { Box } from '@mui/system';

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
    <PortfoliosLayout>
      <Stack direction="row">
        <Stack direction="row" spacing={3}>
          <Form method="post">
            <Button variant="contained" type="submit">
              {t(`create_portfolio`, `Create portfolio`)}
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate(`/portfolios/import`)}
            >
              {t(`import_from_broker`, `Import From Broker`)}
            </Button>
            <Button variant="contained">{t(`upload_csv`, `Upload CSV`)}</Button>
          </Form>
        </Stack>
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
      <Grid container spacing={3}>
        <Grid container item xs={12} spacing={3}>
          {data?.myPortfolios?.map((portfolio) => (
            <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={portfolio._id}>
              <PortfolioCard portfolio={portfolio} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </PortfoliosLayout>
  );
}
