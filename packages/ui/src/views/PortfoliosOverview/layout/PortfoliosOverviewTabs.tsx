import { Tab, Tabs } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';

export type PortfoliosOverviewTabsProps = {};
export const PortfoliosOverviewTabs: React.FC<PortfoliosOverviewTabsProps> = () => {
  const { t } = useTranslation(`portfolios`);
  const { pathname, push } = useRouter();
  return (
    <Tabs value={pathname}>
      <Tab
        label={t(`created`, `Created`)}
        value="/portfolios/created"
        onClick={() => push(`/portfolios/created`)}
      />
      <Tab
        label={t(`following`, `Favourites`)}
        value="/portfolios/favourites"
        onClick={() => push(`/portfolios/favourites`)}
      />
      <Tab
        label={t(`collaboratin`, `Collaborating`)}
        value="/portfolios/collaborating"
        onClick={() => push(`/portfolios/collaborating`)}
      />
    </Tabs>
  );
};
