import { Search } from 'tabler-icons-react';
import { tlsx } from '../../util/clsx';

export function SearchInput() {
  return (
    <div className="relative flex place-items-center">
      <div className="absolute ml-2">
        <Search />
      </div>
      <input
        className={tlsx(
          'rounded-full',
          'border-search-light',
          'dark:border-search-dark',
          'indent-8',
          'hover:opacity-70',
          'focus:border-2',
          'focus:outline-none',
          'focus:opacity-100',
          'py-2',
          'px-2',
          'border-double',
          'border-2'
        )}
      />
    </div>
  );
}
