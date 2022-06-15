import { Typography } from '@mui/material';
import { useLoaderData, useNavigate } from '@remix-run/react';
import {
  ActionFunction,
  json,
  LoaderFunction,
} from '@remix-run/server-runtime';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { validationError } from 'remix-validated-form';
import { AddHoldingWarning } from '~/components/AddHoldingWarning';
import { SymbolSearchModal } from '~/components/SearchModal';
import { authenticatedSdk } from '~/graphql/sdk.server';
import { useIdParam } from '~/hooks';
import { AddHoldingValidator } from '~/validation/portfolios/AddHolding.schema';

export const action: ActionFunction = async ({ request, params }) => {
  const headers = new Headers();
  const sdk = await authenticatedSdk(request, headers);
  const formData = Object.fromEntries(await request.formData());
  const { data, error } = await AddHoldingValidator.validate(formData);

  if (error) return validationError(error);

  const response = sdk.addHolding({
    portfolioId: params.id,
    record: data,
  });

  return json(response, { headers });
};

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);

  const search = url.searchParams.get(`search`);

  return { defaultSearch: search };
};

export default function AddHoldingSearch() {
  const [isTickerSearchOpen, setIsTickerSearchOpen] = useState(true);
  const { t } = useTranslation(`holdings`);
  const navigate = useNavigate();
  const id = useIdParam();

  const { defaultSearch } = useLoaderData();

  return (
    <>
      <AddHoldingWarning />
      <SymbolSearchModal
        defaultValue={defaultSearch}
        open={isTickerSearchOpen}
        onResultSelect={(symbol) => {
          if (symbol) {
            setIsTickerSearchOpen(false);
            navigate(`/portfolios/${id}/holdings/add/${symbol._id}`);
          }
        }}
        modalTitle={t(`add_a_holding_in`, `Add a holding in`)}
        onClose={() => {
          setIsTickerSearchOpen(false);
          navigate(`/portfolios/${id}/holdings`);
        }}
      />
    </>
  );
}
