import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import {
  CreatedPortfoliosPage,
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
CreatedPortfoliosPage.getLayout = (page) => (
  <PortfoliosOverviewLayout>{page}</PortfoliosOverviewLayout>
);

export default CreatedPortfoliosPage;
