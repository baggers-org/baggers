import { Settings } from '@mui/icons-material';
import { Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { useIdParam } from '~/hooks';
import { useCanEditPortfolio } from '~/hooks/useIsPortfolioOwner';

export const PortfolioTabs = () => {
  const { t } = useTranslation(`view_portfolio`);

  const navigate = useNavigate();

  const portfolioId = useIdParam();

  const { pathname } = useLocation();

  const activeTab = `/${
    pathname.split(`/portfolios/${portfolioId}/`).pop()?.split(`/`)[0]
  }`;

  const isOwner = useCanEditPortfolio();

  const jumpToTab = (tab: string) =>
    navigate(`/portfolios/${portfolioId}${tab}`);

  return (
    <Tabs value={activeTab}>
      <Tab
        value="/holdings"
        label={t(`holdings`, `Holdings`)}
        onClick={() => jumpToTab(`/holdings`)}
      />
      <Tab
        value="/transactions"
        label={t(`transactions`, `Transactions`)}
        onClick={() => jumpToTab(`/transactions`)}
      />
      <Tab
        value="/performance"
        label={t(`performance`, `Performance`)}
        onClick={() => jumpToTab(`/performance`)}
        disabled
      />
      <Tab value="/news" label={t(`news`, `News`)} disabled />
      <Tab value="/discussion" label={t(`discussion`, `Discussion`)} disabled />
      {isOwner ? (
        <Tab
          value="/settings"
          icon={<Settings />}
          label={t(`settings`, `Settings`)}
          onClick={() => jumpToTab(`/settings`)}
          sx={{
            marginLeft: `auto`,
          }}
        />
      ) : null}
    </Tabs>
  );
};
