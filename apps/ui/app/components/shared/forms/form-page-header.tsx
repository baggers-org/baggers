import { Link } from '@remix-run/react';
import { FaChevronLeft } from 'react-icons/fa';
import { useT } from '~/hooks/useT';
import { tlsx } from '~/util/clsx';

export type FormPageHeaderProps = {
  title: string;
  subtitle?: string;
  returnLink: string;
};
export function FormPageHeader({
  returnLink,
  title,
  subtitle,
}: FormPageHeaderProps) {
  const t = useT('portfolio_tracker');
  return (
    <section className="mb-8">
      <Link
        tabIndex={-1}
        to={returnLink}
        className={tlsx(
          'text-secondary-light dark:text-secondary-dark',
          'flex place-items-center',
          'mb-3'
        )}
      >
        <FaChevronLeft />
        {t('return', 'Return')}
      </Link>
      <h1 className="font-heading uppercase text-3xl font-bold">
        {title}
      </h1>
      <h2 className="text-lg text-text-secondary-light dark:text-text-secondary-dark">
        {subtitle}
      </h2>
    </section>
  );
}
