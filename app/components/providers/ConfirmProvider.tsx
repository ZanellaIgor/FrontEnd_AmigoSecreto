'use client';

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react';

type ConfirmOptions = {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
};

type ConfirmContextValue = {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
};

const ConfirmContext = createContext<ConfirmContextValue | null>(null);

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [dialog, setDialog] = useState<ConfirmOptions | null>(null);
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
      setDialog(options);
    });
  }, []);

  const close = (result: boolean) => {
    setDialog(null);
    resolveRef.current?.(result);
    resolveRef.current = null;
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {dialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          role="presentation"
          onClick={() => close(false)}
        >
          <div
            role="alertdialog"
            aria-labelledby="confirm-title"
            aria-describedby="confirm-message"
            className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-700/80 bg-gray-900 shadow-2xl shadow-black/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-gray-800 px-5 py-4">
              <h2 id="confirm-title" className="text-lg font-semibold text-white">
                {dialog.title}
              </h2>
            </div>
            <div className="px-5 py-4">
              <p id="confirm-message" className="text-sm text-gray-400">
                {dialog.message}
              </p>
            </div>
            <div className="flex justify-end gap-3 border-t border-gray-800 px-5 py-4">
              <button
                type="button"
                onClick={() => close(false)}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800"
              >
                {dialog.cancelLabel ?? 'Cancelar'}
              </button>
              <button
                type="button"
                autoFocus
                onClick={() => close(true)}
                className={`rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors ${
                  dialog.destructive
                    ? 'bg-red-600 hover:bg-red-500'
                    : 'bg-amber-600 hover:bg-amber-500'
                }`}
              >
                {dialog.confirmLabel ?? 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm deve ser usado dentro de ConfirmProvider');
  }
  return context;
};
