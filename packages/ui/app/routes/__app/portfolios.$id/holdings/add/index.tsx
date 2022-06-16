import { CircularProgress, Typography } from '@mui/material';
import { useLoaderData, useNavigate, useTransition } from '@remix-run/react';
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

  const transition = useTransition();

  const { defaultSearch } = useLoaderData();

  return (
    <>
      <AddHoldingWarning />
      {transition.state === `loading` ? <CircularProgress /> : null}
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
