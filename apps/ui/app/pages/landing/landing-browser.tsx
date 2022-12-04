import { tlsx } from '~/util/clsx';

export function LandingBrowser() {
  return (
    <div
      className={tlsx(
        'absolute bg-[rgba(255,255,255,0.5)]  w-[900px] h-[800px] top-32 right-0',
        'border border-[rgba(216,216,216,1)]',
        'invisible',
        'rounded-l-lg',
        'backdrop-blur-[2px]'
      )}
    ></div>
  );
}
