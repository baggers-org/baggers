import { Settings } from "@mui/icons-material";
import { Tab, Tabs } from "@mui/material";
import { useLocation, useNavigate } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { useIdParam } from "~/hooks";

export const PortfolioTabs = () => {
  const { t } = useTranslation(`view_portfolio`);

  const navigate = useNavigate();

  const portfolioId = useIdParam();

  const { pathname } = useLocation();
  const activeTab = `/${pathname.split(`/`).pop()}`;

  const jumpToTab = (tab: string) =>
    navigate(`/portfolios/${portfolioId}/${tab}`);

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
