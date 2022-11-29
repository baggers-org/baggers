import { clsx } from 'clsx';
import { ButtonProps } from './button.props';

const commonClasses = clsx(
  'rounded-full',
  'flex',
  'place-content-between',
  'place-items-center',
  'transition-colors',
  'border border-1'
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
    default: {
      return <FilledTransparent {...buttonProps} />;
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
function FilledTransparent({
  endIcon,
  ...props
}: Omit<ButtonProps, 'variant'>) {
  return (
    <button {...props}>
      {props.children}
      <EndIcon endIcon={endIcon} />
    </button>
  );
}
