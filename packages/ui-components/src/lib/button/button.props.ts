import React, { PropsWithChildren } from 'react';

export type ButtonProps = PropsWithChildren<
  {
    variant?:
      | 'mono'
      | 'massive'
      | 'normal'
      | 'filled-primary-light'
      | 'filled-primary';

    endIcon?: React.ReactElement;
  } & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;
