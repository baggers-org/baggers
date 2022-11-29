import { Tab as HeadlessTab } from '@headlessui/react';
import { tlsx } from '../../util/clsx';
import { TabsProps } from './tabs.props';

const classes = tlsx(
  'py-1',
  'px-6',
  'text-primary-light dark:text-primary-dark',
  'font-[Poppins]',
  'focus:outline-none',
  'ring-primary-light',
  'focus:ring-2',
  'ring-0',
  'text-lg',
  'hover:text-shadow-primary-light hover:opacity-100'
);
export function Tab({ children, ...buttonProps }: TabsProps) {
  return (
    <HeadlessTab as="button">
      {({ selected }) => (
        <button
          onClick={(e) => {
            e.preventDefault();
            buttonProps.onClick?.(e);
          }}
          className={tlsx(
            selected
              ? 'opacity-100 border-b-2 border-b-primary-light dark:border-b-primary-dark'
              : 'opacity-40',
            classes
          )}
          {...buttonProps}
        >
          {children}
        </button>
      )}
    </HeadlessTab>
  );
}
