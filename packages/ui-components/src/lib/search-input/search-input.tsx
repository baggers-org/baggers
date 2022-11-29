import { tlsx } from '../../util/clsx';
import { FaSearch } from 'react-icons/fa';

export function SearchInput() {
  return (
    <div className="relative flex place-items-center">
      <div className="absolute ml-2">
        <FaSearch />
      </div>
      <input
        placeholder="Search..."
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
          'w-full',
          'border-2'
        )}
      />
    </div>
  );
}
