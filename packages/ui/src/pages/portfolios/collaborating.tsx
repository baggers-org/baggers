import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { CollaboratingPage } from '@/views/PortfoliosOverview';
import { PortfoliosOverviewLayout } from '@/views/PortfoliosOverview/shared';

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [`common`, `portfolios`])),
  },
});
CollaboratingPage.getLayout = (page) => (
  <PortfoliosOverviewLayout>{page}</PortfoliosOverviewLayout>
);

export default CollaboratingPage;
