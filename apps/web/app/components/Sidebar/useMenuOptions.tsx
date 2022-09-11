import { useTranslation } from 'react-i18next';
import { ChartCandle, Folder, LayoutDashboard } from 'tabler-icons-react';
import { useCurrentUser } from '~/hooks/useCurrentUser';

export interface MenuOption {
  label?: string;
  href?: string;
  icon?: any;
  value?: string;
}

export const useMenuOptions = (): MenuOption[] => {
  const { t } = useTranslation();

  const user = useCurrentUser();

  const defaultOptions: MenuOption[] = [
    {
      label: user ? t(`dashboard`, `Dashboard`) : t(`home`, `Home`),
      icon: <LayoutDashboard size={24} />,
      href: `/`,
      value: `/`,
    },
    {
      label: t(`charts`, `Charts`),
      href: `/charts`,
      icon: <ChartCandle size={24} />,
      value: `/charts`,
    },
    {
      label: t(`portfolios`, `Portfolios`),
      href: `/portfolios/created`,
      icon: <Folder size={24} />,
      value: `/portfolios`,
    },
  ];

  return defaultOptions;
};
