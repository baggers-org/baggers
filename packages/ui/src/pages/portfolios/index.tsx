import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PortfoliosPage from '@/views/PortfoliosPage';

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [`common`, `portfolios`])),
  },
});

export default PortfoliosPage;
