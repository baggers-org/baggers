import { ReactElement } from 'react';

export type RadioCardProps = {
  title?: string;
  description?: string;
  icon?: ReactElement;
  className?: string;
  selected?: boolean;
};
