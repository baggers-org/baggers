import { BaseLayout } from '@/components';
import { PositionsPage, ViewPortfolioLayout } from '@/views/ViewPortfolioPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

PositionsPage.getLayout = (page) => (
  <BaseLayout>
    <ViewPortfolioLayout>{page}</ViewPortfolioLayout>
  </BaseLayout>
);

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [`common`, `view_portfolio`])),
  },
});
export default PositionsPage;
