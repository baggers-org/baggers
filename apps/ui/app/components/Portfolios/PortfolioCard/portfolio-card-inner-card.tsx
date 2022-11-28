import { PropsWithChildren } from 'react';
import { tlsx } from '~/util/clsx';

export function PortfolioCardInnerCard({
  children,
}: PropsWithChildren) {
  return (
    <div
      className={tlsx(
        'bg-gradient-to-b',
        'dark:from-[rgba(84,116,254,0.1)]',
        'dark:to-[rgba(154,106,255,0.2)]',
        'group-hover:dark:from-[rgba(84,116,254,0.09)]',
        'group-hover:dark:to-[rgba(154,106,255,0.19)]',
        'from-[rgba(84,116,254,0.1)]',
        'to-[rgba(154,106,255,0.2)]',
        'rounded-3xl',
        'transition-all',
        'h-5/6',
        'pt-4',
        'pb-8',
        'grid'
      )}
    >
      {children}
    </div>
  );
}
