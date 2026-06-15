import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  kicker?: string;
  title?: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  narrow?: boolean;
};

export const PublicShell = ({
  children,
  kicker,
  title,
  description,
  backHref,
  backLabel = 'Voltar ao início',
  narrow = false,
}: Props) => {
  return (
    <div className="relative min-h-full px-4 py-8 sm:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.1),transparent_55%)]" />

      <div
        className={`relative mx-auto ${narrow ? 'max-w-lg' : 'max-w-2xl'}`}
      >
        {backHref && (
          <Link
            href={backHref}
            className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-amber-400"
          >
            <span aria-hidden>←</span>
            {backLabel}
          </Link>
        )}

        {(kicker || title || description) && (
          <header className="mb-8 text-center">
            {kicker && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/90">
                {kicker}
              </p>
            )}
            {title && (
              <h1
                className={`font-bold text-white ${kicker ? 'mt-2 text-3xl sm:text-4xl' : 'text-3xl sm:text-4xl'}`}
              >
                {title}
              </h1>
            )}
            {description && (
              <p className="mt-3 text-sm text-gray-400 sm:text-base">
                {description}
              </p>
            )}
          </header>
        )}

        {children}
      </div>
    </div>
  );
};
