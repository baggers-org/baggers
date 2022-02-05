import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { LandingPageLayout } from '@/components/Layouts/LandingPageLayout';
import SignupPage from '@/views/SignupPage';

SignupPage.getLayout = (page) => <LandingPageLayout>{page}</LandingPageLayout>;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [`common`, `landing_page`])),
  },
});

export default SignupPage;
