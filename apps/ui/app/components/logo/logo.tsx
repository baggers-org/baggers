import LogoSvg from '../../../public/logo.svg';

export function LogoPrimary() {
  return (
    <div
      className="w-12 h-12 text-primary-light dark:text-primary-dark"
      style={{ maxHeight: '3rem', maxWidth: '3rem' }}
    >
      <LogoSvg />
    </div>
  );
}

export function LogoWhite() {
  return (
    <div
      className="w-12 h-12 text-text-dark"
      style={{ maxHeight: '3rem', maxWidth: '3rem' }}
    >
      <LogoSvg />
    </div>
  );
}
