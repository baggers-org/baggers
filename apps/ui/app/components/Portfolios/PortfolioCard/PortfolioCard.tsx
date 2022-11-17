import { Portfolio } from '@baggers/graphql-types';
import { tlsx } from '~/util/clsx';

export type PortfolioCardProps = {
  portfolio: Portfolio;
};
export function PortfolioCard({ portfolio }: PortfolioCardProps) {
  return (
    <div className={tlsx('dark:bg-paper-dark bg-paper-light', 'p-8')}>
      <span className="text-2xl">{portfolio.name}</span>
    </div>
  );
}
