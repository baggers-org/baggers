import { tlsx } from '../../util/clsx';
import { RadioCardProps } from './radio-card.props';

export function RadioCard({
  title,
  description,
  icon,
  className,
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
      <div className="-z-20 relative bg-paper-light">
        <div
          className={tlsx(
            'w-full',
            '-z-10',
            'absolute',
            'group-hover:rounded-xl',
            'transition-all',
            'flex place-content-center',
            'rounded-t-xl',
            'bg-light-purple-100',
            'text-light-purple-800',
            className,
            selected
              ? 'bg-light-purple-100 h-full border border-2 border-light-purple-300 rounded-xl'
              : 'group-hover:h-full h-2'
          )}
        ></div>
        <div className="p-6 py-24">
          <h3
            className={tlsx(
              'font-bold font-heading',
              'text-3xl',
              'flex flex-col',
              'place-items-center',
              'dark:bg-light-purple-700 ',
              'group-hover:underline',
              'mb-8',
              'gap-6',
              selected
                ? 'text-light-purple-900'
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
    </div>
  );
}
