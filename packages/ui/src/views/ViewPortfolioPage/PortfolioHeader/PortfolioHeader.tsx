import React from 'react';
import { Grid, Typography, Link, Divider } from '@mui/material';

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

  const { setName, setDescription } = useEditPortfolio(portfolio?._id);

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
          variant="h4"
          onFinishEdit={(newName) => setName(newName)}
          placeholder={t(`enter_portfolio_title`, `Enter portfolio title`)}
          loading={loading}
          value={portfolio?.name}
        />
      </Grid>
      <Grid item xs={12} mb={4} container>
        {portfolio?.name ? (
          <EditableTypography
            variant="h5"
            value={portfolio?.description}
            loading={loading}
            placeholder={t(
              `enter_portfolio_description`,
              `Enter portfolio description`,
            )}
            onFinishEdit={(newDescription) => setDescription(newDescription)}
          />
        ) : null}
      </Grid>
      {!isCreating ? (
        <Grid item xs={12} mt={4} mb={2}>
          <Typography variant="h6" fontWeight="light" display="flex" gap={1}>
            {t(`this_portfolio_is_private`, `This portfolio is private.`)}
            <Link>{t(`publish`, `Publish`)}</Link>
            {t(`to_share_it_with_others`, `to share it with others.`)}
          </Typography>
        </Grid>
      ) : (
        <Grid item xs={12} my={5}>
          <Divider />
        </Grid>
      )}
    </>
  );
};
