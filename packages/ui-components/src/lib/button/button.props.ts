import React, { PropsWithChildren } from 'react';

export type ButtonProps = PropsWithChildren<
  {
    variant?:
      | 'mono'
      | 'massive'
      | 'primary'
      | 'secondary'
      | 'tertiary';

    endIcon?: React.ReactElement;
  } & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;
