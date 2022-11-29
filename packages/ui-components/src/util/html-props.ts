import React from 'react';

export type HTMLProps<T> = React.DetailedHTMLProps<
  React.HTMLAttributes<T>,
  T
>;
