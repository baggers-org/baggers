import { Grid, MenuItem from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ValidatedForm } from 'remix-validated-form';
import { SectionTitle } from '~/components/SectionTitle';
import { usePortfolio } from '~/hooks/usePortfolio';
import { ValidatedSelect } from '~/validation/components';
import { PortfolioPrivacyValidator } from '~/validation/portfolios/settings/PortfolioPrivacy.schema';
import { ActionButtons } from '../ActionButtons';

export const Privacy: React.FC = () => {
  const { t } = useTranslation('portfolio_settings');

  const { private: portfolioPrivate } = usePortfolio();


  return (
    <ValidatedForm
      method="post"
      validator={PortfolioPrivacyValidator}
      defaultValues={{
        private: portfolioPrivate,
      }}
      subaction="privacy"
    >
      <SectionTitle mb={2}>{t('privacy', 'Privacy')}</SectionTitle>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <ValidatedSelect
            formLabel="Who can view this portfolio?"
            name="private"
            fullWidth
          >
            <MenuItem value="true">
              {t('private', 'Only me (private)')}
            </MenuItem>
            <MenuItem value="false">{t('public', 'Anyone (public)')}</MenuItem>
          </ValidatedSelect>
        </Grid>
        <Grid item xs={12}>
          <ActionButtons />
        </Grid>
      </Grid>
    </ValidatedForm>
  );
};
