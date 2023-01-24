import { FaCheck } from 'react-icons/fa';
import { tlsx } from '../../util/clsx';
import { StepProps } from './step.props';

export function Step({
  title,
  subtitle,
  active,
  complete,
  number,
}: StepProps) {
  return (
    <span className="flex place-items-start gap-4  h-min mb-2">
      <span
        className={tlsx(
          'w-[48px] h-[48px]',
          'absolute',
          '-translate-x-32',
          'rounded-full',
          'flex',
          'place-content-center',
          'font-heading',
          'transition-colors',
          'place-items-center',
          'text-2xl',
          'font-bold',
          active
            ? 'outline outline-2 outline-primary-light dark:outline-dark-purple-500 dark:bg-dark-purple-800' +
                'text-primary-light dark:text-primary-dark'
            : '',

          complete
            ? 'outline-primary-light dark:outline-primary-dark bg-primary-light dark:bg-primary-dark'
            : ''
        )}
      >
        {!complete ? number : <FaCheck />}
      </span>
      <span className="flex flex-col h-full">
        <h2
          className={tlsx(
            'text-xl font-bold',
            active ? 'text-primary-light dark:text-primary-dark' : ''
          )}
        >
          {title}
        </h2>
        <p className="text-text-secondary-light dark:text-text-secondary-dark">
          {subtitle}
        </p>
      </span>
    </span>
  );
}
