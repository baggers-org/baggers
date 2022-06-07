import { useTranslation } from 'react-i18next';
import { useCurrentUser } from '~/hooks/useCurrentUser';

export interface MenuOption {
  label: string;
  href: string;
}

export const useMenuOptions = (): MenuOption[] => {
  const { t } = useTranslation();

  const user = useCurrentUser();

  const defaultOptions: MenuOption[] = [
    {
      label: user ? t(`dashboard`, `Dashboard`) : t(`home`, `Home`),
      href: `/`,
    },
    {
      label: t(`charts`, `Charts`),
      href: `/charts`,
    },
    {
      label: t(`portfolios`, `Portfolios`),
      href: `/portfolios/created`,
    },
  ];

  return defaultOptions;
};
