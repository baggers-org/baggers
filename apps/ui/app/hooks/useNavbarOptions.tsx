import { useTranslation } from 'react-i18next';
import { NavbarOption } from '~/components/Navbar/types';
import { useCurrentUser } from './useCurrentUser';

export const useNavbarOptions = (): NavbarOption[] => {
  const { t } = useTranslation('common');

  const user = useCurrentUser();
  const options = [
    {
      key: '/',
      label: !user ? t('home', 'Home') : t('dashboard', 'Dashboard'),
      to: '/',
    },
    user
      ? {
          key: '/portfolios',
          label: t('portfolios', 'Portfolios'),
          to: '/portfolios/created',
          additionalOptions: [
            {
              key: '/portfolios/created',
              label: t('created_portfolios', 'Created portfolios'),
              to: '/portfolios/created',
            },
            {
              key: '/portfolios/following',
              label: t('followed_portfolios', 'Followed portfolios'),
              to: '/portfolios/following',
            },
          ],
        }
      : undefined,
  ];

  return options.filter((o) => !!o) as NavbarOption[];
};
