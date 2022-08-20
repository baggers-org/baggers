import React from 'react';
import { Stack, Typography } from '@mui/material';

import { EditableTypography } from '~/components';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '~/util';
import { Portfolio } from '@baggers/sdk';
import { useFetcher } from '@remix-run/react';

export type PortfolioHeaderProps = {
  portfolio: Portfolio;
};

export const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({
  portfolio,
}) => {
  const { t } = useTranslation(`view_portfolio`);

  const fetcher = useFetcher();

  return (
    <Stack>
      {portfolio?.totalValue ? (
        <Stack>
          <Typography variant="h4" color="mediumEmphasis">
            {formatCurrency(portfolio?.totalValue)}
          </Typography>
        </Stack>
      ) : null}
      <EditableTypography
        name="name"
        variant="h2"
        isSubmitting={!!fetcher.submission}
        confirmButtonAriaLabel={t(
          `confirm_portfolio_name`,
          `confirm portfolio name`
        )}
        cancelButtonAriaLabel={t(
          `cancel_portfolio_edit`,
          `cancel portfolio edit`
        )}
        placeholder={t(`enter_portfolio_title`, `Enter portfolio title`)}
        onFinishEdit={(name) => fetcher.submit({ name }, { method: `patch` })}
        value={
          (fetcher?.submission?.formData?.get(`name`) as string) ||
          portfolio?.name
        }
      />
    </Stack>
  );
};
