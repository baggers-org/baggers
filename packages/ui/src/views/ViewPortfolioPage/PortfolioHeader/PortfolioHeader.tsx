import React from 'react';
import { Grid, Typography, Divider } from '@mui/material';

import { EditableTypography, PriceTag } from '@/components';
import { Portfolio } from '@/graphql/Queries.document.gql';
import { useTranslation } from 'next-i18next';
import { useEditPortfolio } from '@/hooks';

export type PortfolioHeaderProps = {
  portfolio: Portfolio;
  isCreating: boolean;
  loading: boolean;
};

export const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({
  portfolio,
  isCreating,
  loading,
}) => {
  const { t } = useTranslation(`view_portfolio`);

  const { setName } = useEditPortfolio(portfolio?._id);

  return (
    <>
      <Grid item xs={12}>
        {portfolio?.totalValue ? (
          <Grid item container xs={12} alignItems="center" gap={2}>
            <Typography variant="h5" color="mediumEmphasis">
              ${portfolio?.totalValue}
            </Typography>
            <PriceTag color="profit">+12%</PriceTag>
          </Grid>
        ) : null}
      </Grid>
      <Grid item xs={12} container mt={!portfolio?.totalValue ? 2 : 0}>
        <EditableTypography
          variant="h2"
          onFinishEdit={(newName) => setName(newName)}
          placeholder={t(`enter_portfolio_title`, `Enter portfolio title`)}
          loading={loading}
          value={portfolio?.name}
        />
      </Grid>
      {isCreating ? (
        <Grid item xs={12} my={5}>
          <Divider />
        </Grid>
      ) : null}
    </>
  );
};
