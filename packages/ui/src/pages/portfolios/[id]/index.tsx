import { BaseLayout } from '@/components';
import ViewPortfolioPage from '@/views/ViewPortfolioPage';

ViewPortfolioPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
export default ViewPortfolioPage;
