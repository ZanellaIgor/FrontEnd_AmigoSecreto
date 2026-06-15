import type { ReactNode } from 'react';

type Props = {
  title?: string;
  description?: string;
  children: ReactNode;
};

export const FormSection = ({ title, description, children }: Props) => {
  return (
    <section className="rounded-xl border border-gray-700/80 bg-gray-950/50 p-4">
      {title && (
        <h4 className="text-sm font-semibold text-gray-200">{title}</h4>
      )}
      {description && (
        <p className={`text-xs text-gray-500 ${title ? 'mt-1' : ''}`}>
          {description}
        </p>
      )}
      <div className={title || description ? 'mt-4 space-y-4' : 'space-y-4'}>
        {children}
      </div>
    </section>
  );
};
