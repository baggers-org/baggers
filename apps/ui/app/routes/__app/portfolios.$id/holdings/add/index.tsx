import { CircularProgress } from '@mui/material';
import { useLoaderData, useNavigate, useTransition } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/server-runtime';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SecuritySearchModal } from 'apps/ui/app/components/SearchModal';
import { useIdParam } from 'apps/ui/app/hooks';

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
      {transition.state === `loading` ? <CircularProgress /> : null}
      <SecuritySearchModal
        defaultValue={defaultSearch}
        open={isTickerSearchOpen}
        onResultSelect={(security) => {
          if (security) {
            setIsTickerSearchOpen(false);
            navigate(`/portfolios/${id}/holdings/add/${security._id}`);
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
