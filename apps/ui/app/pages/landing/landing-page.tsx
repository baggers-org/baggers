import { tlsx } from '~/util/clsx';
import { LandingBrowser } from './landing-browser';

export function LandingPage() {
  return (
    <section
      className={tlsx(
        'mt-16',
        'lg:mt-64 lg:px-24 px-8',
        'font-extrabold lg:text-6xl text-3xl',
        'lg:w-[800px]',
        'text-center lg:text-left'
      )}
    >
      <div className="flex flex-col gap-5">
        <h1>
          Your homepage for the{' '}
          <span
            className={tlsx(
              'bg-gradient-to-b from-primary-light to-secondary-light',
              'dark:from-primary-dark dark:to-secondary-dark',
              'bg-clip-text',
              'text-[rgba(0,0,0,0)]'
            )}
          >
            stock market.
          </span>{' '}
        </h1>

        <ul
          className={tlsx(
            'lg:text-lg text-sm font-normal text-text-secondary-light dark:text-text-secondary-dark'
          )}
        >
          <li>
            Track your investments, find new opportunities, and stay
            ahead of the competition.
          </li>
          <li>Join our community of investors for free today.</li>
        </ul>
        <button
          className={tlsx(
            'dark:bg-primary-dark bg-primary-light rounded-full lg:text-lg text-sm font-normal',
            'p-4',
            'w-48',
            'hover:opacity-60',
            'text-text-dark',
            'place-self-center'
          )}
        >
          Get started
        </button>
      </div>
      <LandingBrowser />
    </section>
  );
}
