import { PropsWithChildren } from 'react';

export function Paper({ children }: PropsWithChildren) {
  return (
    <div className="bg-paper-light dark:bg-paper-dark shadow-md rounded-xl">
      {children}
    </div>
  );
}
