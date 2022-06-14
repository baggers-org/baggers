import { Typography } from '@mui/material';
import { useNavigate } from '@remix-run/react';
import { ActionFunction, json } from '@remix-run/server-runtime';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { validationError } from 'remix-validated-form';
import { AddHoldingWarning } from '~/components/AddHoldingWarning';
import { SymbolSearchModal } from '~/components/SearchModal';
import { Symbol } from '~/generated/graphql';
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

export default function AddHolding() {
  const [isTickerSearchOpen, setIsTickerSearchOpen] = useState(true);
  const [addSymbol, setAddSymbol] = useState<Symbol | undefined>();
  const { t } = useTranslation(`holdings`);
  const navigate = useNavigate();
  const id = useIdParam();

  return (
    <>
      {addSymbol ? (
        <Typography variant="h6" color='textSecondary'>{t(`add_holding`, `Add holding`)}</Typography>
      ) : null}
      <AddHoldingWarning />
      <SymbolSearchModal
        open={isTickerSearchOpen}
        onResultSelect={(symbol) => {
          if (symbol) {
            setAddSymbol(symbol);
            setIsTickerSearchOpen(false);
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
