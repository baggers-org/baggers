import clsx from 'clsx';
import { FormSectionHeaderProps } from './form-section-header.props';

export function FormSectionHeader({
  title,
  icon,
  className,
}: FormSectionHeaderProps) {
  return (
    <h2
      className={clsx(
        'flex w-full place-content-start place-items-center gap-6 px-8 py-2',
        'bg-primary-transparent-light dark:bg-primary-transparent-dark',
        'dark:heropattern-charliebrown-paper-dark heropattern-charliebrown-paper-light',
        className
      )}
    >
      {icon}
      {title}
    </h2>
  );
}
