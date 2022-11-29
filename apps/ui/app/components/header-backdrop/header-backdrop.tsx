import { tlsx } from '~/util/clsx';
import { HeaderBackdropProps } from './header-backdrop.props';

export function HeaderBackdrop({
  height = '250px',
}: HeaderBackdropProps) {
  return (
    <div
      style={{ height }}
      className={tlsx(
        'absolute bg-background-light w-screen top-0 left-0 -z-10',
        'dark:bg-background-dark',
        'shadow-md',
        'shadow-[rgba(96,96,96,0.14)]'
      )}
    />
  );
}
