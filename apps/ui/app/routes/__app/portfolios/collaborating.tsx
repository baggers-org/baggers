import { MetaFunction } from '@remix-run/node';
import NotImplemented from 'apps/ui/app/components/Layouts/NotImplemented';

export const meta: MetaFunction = () => ({
  title: `Collaborating portfolios`,
});
export default function Collaborating() {
  return <NotImplemented />;
}
