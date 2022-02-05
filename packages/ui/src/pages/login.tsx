import { LandingPageLayout } from '@/components/Layouts/LandingPageLayout';
import { LoginPage } from '@/views/LoginPage';

LoginPage.getLayout = (page) => <LandingPageLayout>{page}</LandingPageLayout>;

export default LoginPage;
