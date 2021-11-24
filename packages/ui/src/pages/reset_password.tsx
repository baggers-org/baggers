import { ResetPasswordPage } from '@/views/ResetPasswordPage';

ResetPasswordPage.withoutAppBar = true;

export default ResetPasswordPage;

export const getStaticProps = async () => {
  return {
    props: {},
  };
};
