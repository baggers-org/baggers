import clsx from 'clsx';
import { tlsx } from '../../util/clsx';
import { RadioCardProps } from './radio-card.props';

export function RadioCard({
  title,
  description,
  icon,
  selected,
}: RadioCardProps) {
  return (
    <div
      className={tlsx(
        'rounded-xl',
        'relative',
        'text-center',
        'shadow-sm',
        'cursor-pointer',
        'transition-all',
        'group'
      )}
    >
      <div
        className={clsx(
          'bg-paper-light dark:bg-paper-dark',
          'p-6 py-24',
          'hover:bg-light-purple-100 hover:dark:bg'
        )}
      >
        <h3
          className={tlsx(
            'font-bold font-heading',
            'text-3xl',
            'flex flex-col',
            'place-items-center',
            'mb-8',
            'gap-6',
            selected
              ? 'text-light-purple-900 dark:text-text-dark'
              : 'text-light-purple-600'
          )}
        >
          {icon}
          {title}
        </h3>
        <h4
          className={tlsx(
            selected
              ? 'text-light-purple-900'
              : 'text-text-secondary-light'
          )}
        >
          {description}
        </h4>
      </div>
    </div>
  );
}
