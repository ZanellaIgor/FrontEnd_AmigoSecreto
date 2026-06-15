import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const AdminShell = ({ children }: Props) => {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6">{children}</div>
  );
};
