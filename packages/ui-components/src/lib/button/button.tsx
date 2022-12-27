import { clsx } from 'clsx';
import { ButtonProps } from './button.props';

const commonClasses = clsx(
  'rounded-full',
  'flex',
  'place-content-between',
  'place-items-center',
  'transition-colors',
  'border border-1',
  'gap-4',

  'font-heading'
);

function EndIcon({ endIcon }: ButtonProps) {
  return endIcon ? <div className="ml-auto">{endIcon}</div> : null;
}

export function Button({ variant, ...buttonProps }: ButtonProps) {
  switch (variant) {
    case 'massive': {
      return <MassiveVariant {...buttonProps} />;
    }
    case 'mono': {
      return <Mono {...buttonProps} />;
    }
    case 'secondary': {
      return <Secondary {...buttonProps} />;
    }
    case 'tertiary': {
      return <Tertiary {...buttonProps} />;
    }
    default: {
      return <Primary {...buttonProps} />;
    }
  }
}

function MassiveVariant({
  endIcon,
  ...props
}: Omit<ButtonProps, 'variant'>) {
  return (
    <button
      {...props}
      className={clsx(
        commonClasses,
        'border border-primary-light dark:border-primary-dark ',
        'font-normal',
        'px-8',
        'py-3',
        'text-primary-light dark:text-primary-dark',
        'hover:bg-primary-light hover:text-text-dark hover:dark:text-text-dark',
        'gap-32'
      )}
    >
      {props.children}
      <EndIcon endIcon={endIcon} />
    </button>
  );
}
function Mono({ endIcon, ...props }: Omit<ButtonProps, 'variant'>) {
  return (
    <button
      {...props}
      className={clsx(
        commonClasses,

        'bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark',
        'font-heading',
        'text-sm',
        'px-6',
        'py-1',
        'gap-4',
        'hover:bg-background-dark hover:dark:bg-background-light',
        'hover:text-text-dark hover:dark:text-text-light'
      )}
    >
      {props.children}
      <EndIcon endIcon={endIcon} />
    </button>
  );
}
function Tertiary({
  endIcon,
  ...props
}: Omit<ButtonProps, 'variant'>) {
  return (
    <button
      {...props}
      className={clsx(
        commonClasses,
        'dark:text-primary-dark',
        'hover:dark:bg-[rgba(154,106,255,0.13)]',
        'hover:dark:border-[rgba(154,106,255,0.35)]',
        'text-primary-light',
        'p-3',
        'px-8',
        'border border-primary-light',
        'dark:border-primary-dark'
      )}
    >
      {props.children}
      <EndIcon endIcon={endIcon} />
    </button>
  );
}

function Primary({
  endIcon,
  ...props
}: Omit<ButtonProps, 'variant'>) {
  return (
    <button
      {...props}
      className={clsx(
        commonClasses,
        'bg-primary-light',
        'dark:bg-primary-dark',
        'border-none',
        'hover:outline  hover:outline-1 outline-primary-light dark:outline-primary-dark',
        'text-text-dark',
        'dark:border-none',
        'p-2',
        'px-8'
      )}
    >
      {props.children}
      <EndIcon endIcon={endIcon} />
    </button>
  );
}

function Secondary({
  endIcon,
  ...props
}: Omit<ButtonProps, 'variant'>) {
  return (
    <button
      {...props}
      className={clsx(
        commonClasses,
        'bg-primary-transparent-light',
        'dark:bg-primary-transparent-dark',
        'border-none',
        'hover:outline  hover:outline-1 outline-primary-light dark:outline-primary-dark',
        'dark:text-text-dark',
        'text-primary-light',
        'dark:border-none',
        'p-3',
        'px-8'
      )}
    >
      {props.children}
      <EndIcon endIcon={endIcon} />
    </button>
  );
}
