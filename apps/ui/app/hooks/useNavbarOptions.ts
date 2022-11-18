import { useTranslation } from 'react-i18next';
import { NavbarOption } from '~/components/Navbar/types';

export const useNavbarOptions = (): NavbarOption[] => {
  const { t } = useTranslation('common');

  return [
    {
      key: '/',
      label: t('home', 'Home'),
      to: '/',
    },
    {
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
    },
    {
      key: '/news',
      label: 'News',
      to: '/news',
    },
    {
      key: '/discover',
      label: 'Discover',
      to: '/discover',
    },
  ];
};
