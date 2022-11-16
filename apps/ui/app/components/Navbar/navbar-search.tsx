import { SearchInput } from '../Forms';
import { NavbarClip } from './navbar-clip';

export function NavbarSearch() {
  return (
    <div className="flex align-middle justify-center place-items-center">
      <div className="absolute z-10 mt-6">
        <SearchInput />
      </div>

      <NavbarClip />
    </div>
  );
}
