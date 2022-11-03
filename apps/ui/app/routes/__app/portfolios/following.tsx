import { MetaFunction } from '@remix-run/server-runtime';
import NotImplemented from 'apps/ui/app/components/Layouts/NotImplemented';

export const meta: MetaFunction = () => ({
  title: `Followed portfolios`,
});
export default function Following() {
  return <NotImplemented title="Following" />;
}
