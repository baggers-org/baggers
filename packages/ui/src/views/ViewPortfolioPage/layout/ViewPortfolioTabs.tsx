import { Settings } from '@mui/icons-material';
import { Tab, Tabs } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { usePortfolioIdFromURL } from '../hooks';

export const ViewPortfolioTabs = () => {
  const { t } = useTranslation(`view_portfolio`);

  const { push, pathname } = useRouter();

  const portfolioId = usePortfolioIdFromURL();
  const activeTab = `/${pathname.split(`/`).pop()}`;

  const jumpToTab = (tab: string) => push(`/portfolios/${portfolioId}/${tab}`);

  return (
    <Tabs value={activeTab}>
      <Tab
        value="/positions"
        label={t(`positions`, `Positions`)}
        onClick={() => jumpToTab(`/positions`)}
      />
      <Tab
        value="/performance"
        label={t(`performance`, `Performance`)}
        onClick={() => jumpToTab(`/performance`)}
        disabled
      />
      <Tab value="/news" label={t(`news`, `News`)} disabled />
      <Tab value="/discussion" label={t(`discussion`, `Discussion`)} disabled />
      <Tab
        value="/settings"
        icon={<Settings />}
        label={t(`settings`, `Settings`)}
        onClick={() => jumpToTab(`/settings`)}
        sx={{
          marginLeft: `auto`,
        }}
      />
    </Tabs>
  );
};
