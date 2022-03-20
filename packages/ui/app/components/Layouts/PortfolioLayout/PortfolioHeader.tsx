import React from 'react';
import { Grid, Stack, Typography } from '@mui/material';

import { EditableTypography, PriceTag } from '~/components';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '~/util';
import { Portfolio } from '~/generated/graphql';
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
        variant="h2"
        name="name"
        isSubmitting={!!fetcher.submission}
        placeholder={t(`enter_portfolio_title`, `Enter portfolio title`)}
        onFinishEdit={(name) => fetcher.submit({ name }, { method: `post` })}
        value={
          (fetcher?.submission?.formData?.get(`name`) as string) ||
          portfolio?.name
        }
      />
    </Stack>
  );
};
