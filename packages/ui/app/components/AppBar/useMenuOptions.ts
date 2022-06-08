import { useTranslation } from 'react-i18next';
import { useCurrentUser } from '~/hooks/useCurrentUser';

export interface MenuOption {
  label: string;
  href: string;
  value: string;
}

export const useMenuOptions = (): MenuOption[] => {
  const { t } = useTranslation();

  const user = useCurrentUser();

  const defaultOptions: MenuOption[] = [
    {
      label: user ? t(`dashboard`, `Dashboard`) : t(`home`, `Home`),
      href: `/`,
      value: `/`,
    },
    {
      label: t(`charts`, `Charts`),
      href: `/charts`,
      value: `/charts`,
    },
    {
      label: t(`portfolios`, `Portfolios`),
      href: `/portfolios/created`,
      value: `/portfolios`,
    },
  ];

  return defaultOptions;
};
