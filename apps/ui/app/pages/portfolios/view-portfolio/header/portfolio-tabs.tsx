import { Tab, Tabs } from '@baggers/ui-components';
import { useLocation, useNavigate } from '@remix-run/react';
import { useT } from '~/hooks/useT';
import { ViewPortfolioProps } from '../types';

export function PortfolioTabs({ portfolio }: ViewPortfolioProps) {
  const t = useT('portfolio_tracker');
  const { pathname } = useLocation();

  const activeTab = `/${
    pathname
      .split(`/portfolios/${portfolio._id}/`)
      .pop()
      ?.split(`/`)[0]
  }`;

  const tabs = [
    {
      label: t('overview', 'Overview'),
      href: `/portfolios/${portfolio._id}/overview`,
      key: '/overview',
    },
    {
      label: t('holdings', 'Holdings'),
      href: `/portfolios/${portfolio._id}/holdings`,
      key: '/holdings',
    },
    {
      label: t('transactions', 'Transactions'),
      href: `/portfolios/${portfolio._id}/transactions`,
      key: '/transactions',
    },
  ];

  const navigate = useNavigate();
  const jumpToTab = (href: string) => navigate(href);

  return (
    <Tabs
      defaultIndex={0}
      selectedIndex={tabs.findIndex((tab) => tab.key === activeTab)}
    >
      {tabs.map((t) => (
        <Tab
          onClick={(e) => {
            e.preventDefault();
            jumpToTab(t.href);
          }}
        >
          {t.label}
        </Tab>
      ))}
    </Tabs>
  );
}
