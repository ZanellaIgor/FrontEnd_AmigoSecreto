import { ChangeEvent, TextareaHTMLAttributes } from 'react';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  errorMessage?: string;
  label?: string;
};

export const TextAreaField = ({
  value,
  onChange,
  errorMessage,
  label,
  id,
  rows = 3,
  className = '',
  ...rest
}: Props) => {
  const inputId = id ?? rest.name ?? 'textarea-field';

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-gray-300"
        >
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        value={value}
        onChange={onChange}
        rows={rows}
        {...rest}
        className={`block w-full resize-none rounded-lg border bg-gray-950 px-3 py-2.5 text-base text-gray-100 outline-none transition-colors placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-60 ${
          errorMessage
            ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20'
            : 'border-gray-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
        }`}
        aria-invalid={Boolean(errorMessage)}
        aria-describedby={errorMessage ? `${inputId}-error` : undefined}
      />
      {errorMessage && (
        <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-400">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
