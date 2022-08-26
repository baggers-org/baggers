import { useTranslation } from 'react-i18next';
import { Dashboard, Folder, LineAxis } from '@mui/icons-material';
import { useCurrentUser } from '~/hooks/useCurrentUser';

export interface MenuOption {
  label: string;
  href: string;
  icon: any;
  value: string;
}

export const useMenuOptions = (): MenuOption[] => {
  const { t } = useTranslation();

  const user = useCurrentUser();

  const defaultOptions: MenuOption[] = [
    {
      label: user ? t(`dashboard`, `Dashboard`) : t(`home`, `Home`),
      icon: <Dashboard />,
      href: `/`,
      value: `/`,
    },
    {
      label: t(`charts`, `Charts`),
      href: `/charts`,
      icon: <LineAxis />,
      value: `/charts`,
    },
    {
      label: t(`portfolios`, `Portfolios`),
      href: `/portfolios/created`,
      icon: <Folder />,
      value: `/portfolios`,
    },
  ];

  return defaultOptions;
};
