'use client';

import { Toaster } from 'sonner';
import { ConfirmProvider } from './ConfirmProvider';
import type { ReactNode } from 'react';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ConfirmProvider>
      {children}
      <Toaster
        position="top-center"
        richColors
        closeButton
        toastOptions={{
          className: 'text-sm',
        }}
      />
    </ConfirmProvider>
  );
};
