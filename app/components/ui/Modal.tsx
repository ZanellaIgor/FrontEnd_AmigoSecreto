'use client';

import { ReactNode, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';

type Props = {
  onClose: () => void;
  title?: string;
  description?: string;
  size?: 'md' | 'lg';
  fixedHeight?: boolean;
  children: ReactNode;
};

const sizeClass = {
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

export const Modal = ({
  onClose,
  title,
  description,
  size = 'md',
  fixedHeight = false,
  children,
}: Props) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="presentation"
      onClick={onClose}
    >
      <div
        className={`flex w-full flex-col overflow-hidden rounded-2xl border border-gray-700/80 bg-gray-900 shadow-2xl shadow-black/50 ${sizeClass[size]} ${
          fixedHeight
            ? 'h-[min(90vh,680px)]'
            : 'max-h-[min(90vh,680px)]'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-gray-800 px-5 py-4">
          <div className="min-w-0">
            {title && (
              <h2
                id="modal-title"
                className="truncate text-lg font-semibold text-white"
              >
                {title}
              </h2>
            )}
            {description && (
              <p id="modal-description" className="mt-1 text-sm text-gray-400">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
          >
            <IoMdClose className="text-xl" aria-hidden />
          </button>
        </div>

        <div
          className={`min-h-0 flex-1 px-5 py-4 ${
            fixedHeight
              ? 'flex flex-col overflow-hidden'
              : 'overflow-y-auto panel-scroll'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
