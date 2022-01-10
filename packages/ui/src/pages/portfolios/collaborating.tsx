import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import {
  CollaboratingPage,
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
CollaboratingPage.getLayout = (page) => (
  <PortfoliosOverviewLayout>{page}</PortfoliosOverviewLayout>
);

export default CollaboratingPage;