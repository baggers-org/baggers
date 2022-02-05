import { LandingPageLayout } from '@/components/Layouts/LandingPageLayout';
import { LandingPage } from '@/views/LandingPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

LandingPage.getLayout = (page) => <LandingPageLayout>{page}</LandingPageLayout>;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [`common`, `landing_page`])),
  },
});

export default LandingPage;
