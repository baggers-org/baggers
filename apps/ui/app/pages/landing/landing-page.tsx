import { Form, useActionData } from '@remix-run/react';
import { tlsx } from '~/util/clsx';
import { LandingBrowser } from './landing-browser';
import { motion } from 'framer-motion';

export function LandingPage() {
  const data = useActionData();

  return (
    <section
      className={tlsx(
        'mt-16',
        'lg:mt-64 lg:px-24 px-8',
        'lg:w-[800px]',
        'text-center lg:text-left'
      )}
    >
      <div className="flex flex-col gap-5 ">
        <h1 className="lg:text-6xl text-3xl font-extrabold ">
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
        </ul>
        <p className="mt-8 text-text-secondary-light dark:text-text-secondary-dark">
          Enter your email to be notified when the alpha build is
          available
        </p>
        {!data ? (
          <Form
            method="post"
            className="flex gap-4 place-items-center"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className={tlsx(
                'rounded-full',
                'border-search-light',
                'dark:border-search-dark',
                'indent-8',
                'hover:opacity-70',
                'text-md font-normal',
                'focus:border-2',
                'focus:outline-none',
                'focus:opacity-100',
                'py-2',
                'px-2',
                'h-14',
                'border-double',
                'w-full',
                'border-2'
              )}
            />
            <button
              tabIndex={0}
              name="intent"
              type="submit"
              value="addAlphaTesterEmail"
              className={tlsx(
                'dark:bg-primary-dark bg-primary-light rounded-full lg:text-lg text-sm font-normal',
                'w-48',
                'p-3',
                'hover:opacity-60',
                'text-text-dark',
                'place-self-center'
              )}
            >
              Get notified
            </button>
          </Form>
        ) : null}
        {data?.addAlphaTesterEmail ? (
          <motion.div
            className="text-secondary-light dark:text-secondary-dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Thanks for signing up - we will email you when we are
            ready!
          </motion.div>
        ) : null}
      </div>
      <LandingBrowser />
    </section>
  );
}
