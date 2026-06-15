import { ChangeEvent, SelectHTMLAttributes } from 'react';

type Option = {
  value: string | number;
  label: string;
};

type Props = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> & {
  value: string | number;
  onChange: (value: number) => void;
  options: Option[];
  label?: string;
  placeholder?: string;
};

export const SelectField = ({
  value,
  onChange,
  options,
  label,
  placeholder,
  id,
  className = '',
  disabled,
  ...rest
}: Props) => {
  const selectId = id ?? 'select-field';

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1.5 block text-sm font-medium text-gray-300"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        {...rest}
        className="block w-full cursor-pointer rounded-lg border border-gray-700 bg-gray-950 px-3 py-2.5 text-base text-gray-100 outline-none transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {placeholder && (
          <option value={0}>{placeholder}</option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
