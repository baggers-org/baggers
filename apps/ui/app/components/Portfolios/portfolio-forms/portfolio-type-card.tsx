import { PortfolioType } from '@baggers/graphql-types';
import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';

export type PortfolioTypeCardProps = {
  name: string;
  description: string;
  iconUrl: string;
  value: PortfolioType;
  selected?: string;
  footer?: React.ReactElement;
};
export function PortfolioTypeCard({
  name,
  value,
  description,
  iconUrl,
  selected,
  footer,
}: PortfolioTypeCardProps) {
  return (
    <RadioGroup.Option
      value={value}
      className={({ checked }) =>
        clsx(
          'flex lg:flex-col',
          'bg-paper-light dark:bg-paper-dark',
          'rounded-xl',
          'cursor-pointer',
          'outline-primary-light dark:outline-primary-dark',
          checked ? 'outline' : '',
          'hover:bg-neutral-2 dark:hover:bg-d-neutral-3',
          'transition-opacity',
          !checked && selected ? 'opacity-40' : ''
        )
      }
    >
      <div className={clsx('flex place-content-center p-8')}>
        <img src={iconUrl} className={clsx('h-32 lg:h-48')} />
      </div>
      <div className="text-center p-4 mb-8">
        <h2
          className={clsx(
            'text-2xl',
            'font-bold',
            'mb-3',
            'font-heading'
          )}
        >
          {name}
        </h2>
        <p className="text-text-secondary-light dark:text-text-secondary-dark">
          {description}
        </p>
      </div>
      {footer ? footer : null}
    </RadioGroup.Option>
  );
}
