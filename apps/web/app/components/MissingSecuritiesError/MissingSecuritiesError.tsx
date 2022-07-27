import { Alert, AlertTitle, IconButton } from '@mui/material';
import { t } from 'i18next';
import React from 'react';
import { Portfolio } from '~/generated/graphql';
import { pluralOrNot } from '~/util/pluralOrNot';
import { Link, useFetcher } from '@remix-run/react';
import { Box } from '@mui/system';
import { Close } from '@mui/icons-material';

export type MissingSecuritiesErrorProps = {
  portfolio: Portfolio;
};
export const MissingSecuritiesError: React.FC<MissingSecuritiesErrorProps> = ({
  portfolio,
}) => {
  const missingSecuritiesError = portfolio?.plaid?.missingSecuritiesError;
  const missingHoldings = missingSecuritiesError?.missingSymbols;

  const clearImport = useFetcher();
  return missingSecuritiesError?.message ? (
    <Alert
      color="error"
      sx={{
        mb: 3,
        mt: -4,
        minWidth: `50%`,
        opacity: clearImport?.state !== `idle` ? 0.2 : 1,
      }}
      action={
        <IconButton
          aria-label={t(`close_import`, `Close import error`)}
          onClick={() => {
            clearImport.submit(null, {
              method: `post`,
              action: `/portfolios/${portfolio?._id}/clear_import_error`,
            });
          }}
        >
          <Close />
        </IconButton>
      }
    >
      <AlertTitle>{t(`import_error`, `Import Error`)}</AlertTitle>
      {t(
        `missing_error`,
        `We had trouble importing ${missingHoldings?.length} ${pluralOrNot(
          `symbol`,
          missingHoldings || [],
        )} into this portfolio. `,
      )}
      <strong>
        {missingSecuritiesError?.missingSymbols?.map((s) => s.symbol).join(`,`)}
      </strong>
      <Box ml="auto">
        <Link to="/import-error">Find out more</Link>
      </Box>
    </Alert>
  ) : null;
};
