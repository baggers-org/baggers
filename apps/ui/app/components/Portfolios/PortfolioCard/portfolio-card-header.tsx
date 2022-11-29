import { Avatar } from '@baggers/ui-components';
import { tlsx } from '~/util/clsx';
import { PortfolioCardProps } from './portfolio-card';

export function PortfolioCardHeader({
  portfolio,
}: PortfolioCardProps) {
  return (
    <div className="flex pr-4 place-self-start w-full gap-2 xl:gap-8">
      <div
        className={tlsx(
          'dark:bg-gradient-to-b',
          'dark:from-[rgba(84,116,254,0.74)]',
          'dark:to-[rgba(154,106,255,0.74)]',
          'bg-[#1A2030]',
          'opacity-[0.85]',
          'text-paper-light',
          'rounded-r-full',
          'px-6',
          'py-3'
        )}
      >
        <span className="text-lg font-bold">
          {portfolio.name || 'Unnamed Portfolio'}
        </span>
        <span className="text-xs line-clamp-1">
          {portfolio.description}
        </span>
      </div>
      <div className="ml-auto place-self-end min-w-fit max-w-fit">
        <Avatar
          src={portfolio.owner.photos?.[0]}
          size="md"
          label={portfolio.owner.displayName}
          alt=""
          fallbackInitials={portfolio.owner.displayName.charAt(0)}
        />
      </div>
    </div>
  );
}
