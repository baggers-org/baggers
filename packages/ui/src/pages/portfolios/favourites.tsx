import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import {
  FavouritesPage,
  PortfoliosOverviewLayout,
} from '@/views/PortfoliosOverview';

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      `common`,
      `portfolios_overview`,
    ])),
  },
});
FavouritesPage.getLayout = (page) => (
  <PortfoliosOverviewLayout>{page}</PortfoliosOverviewLayout>
);

export default FavouritesPage;
