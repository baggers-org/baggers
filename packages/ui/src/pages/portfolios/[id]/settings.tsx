import { BaseLayout } from '@/components';
import { ViewPortfolioLayout } from '@/views/ViewPortfolioPage';
import { SettingsPage } from '@/views/ViewPortfolioPage/SettingsPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

SettingsPage.getLayout = (page) => (
  <BaseLayout>
    <ViewPortfolioLayout>{page}</ViewPortfolioLayout>
  </BaseLayout>
);

// TODO: static gen
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [`common`, `view_portfolio`])),
  },
});

export default SettingsPage;
