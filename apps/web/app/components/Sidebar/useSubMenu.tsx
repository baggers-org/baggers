import { useLocation } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { Globe, User, UserPlus, Users } from 'tabler-icons-react';
import { MenuOption } from './useMenuOptions';

export const useSubMenu = (): {
  options: MenuOption[];
  title: string;
} | null => {
  const { pathname } = useLocation();

  const { t } = useTranslation('common');

  if (pathname.startsWith('/portfolios/') && pathname.split('/').length <= 3) {
    return {
      title: t('portfolios', 'Portfolios'),
      options: [
        {
          label: t('your_portfolios', 'Your portfolios'),
          href: '/portfolios/created',
          icon: <User />,
        },
        {
          label: t('following', 'Following'),
          href: '/portfolios/following',
          icon: <UserPlus />,
        },
        {
          label: t('collaborating', 'Collaborating'),
          href: '/portfolios/collaborating',
          icon: <Users />,
        },
        {
          label: undefined,
        },
        {
          label: t('discover', 'Discover'),
          href: '/portfolios/discover',
          icon: <Globe />,
        },
      ],
    };
  }

  return null;
};
