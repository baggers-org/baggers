import { tlsx } from '../../util/clsx';

export const inputCommonClasses = tlsx(
  'dark:bg-dark-grey-700 ',
  'bg-light-grey-300',
  'focus:outline outline-2 outline-primary-light dark:outline-primary-dark',
  'hover:bg-primary-transparent-light dark:hover:bg-primary-transparent-dark',
  'active:outline',
  'rounded-xl',
  'p-3'
);
