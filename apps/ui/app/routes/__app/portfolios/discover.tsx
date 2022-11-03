import { MetaFunction } from '@remix-run/server-runtime';
import NotImplemented from 'apps/ui/app/components/Layouts/NotImplemented';

export const meta: MetaFunction = () => ({
  title: `Discover portfolios`,
});
export default function DiscoverPortfoliosPage() {
  return <NotImplemented />;
}
