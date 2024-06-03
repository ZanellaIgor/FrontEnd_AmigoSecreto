import { ChangeEvent, InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  type?: 'text' | 'password';
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
};
export const InputField = ({
  type = 'text',
  value,
  onChange,
  errorMessage,
  ...rest
}: Props) => {
  return (
    <div className="w-full my-3">
      <input
        type={type}
        value={value}
        onChange={onChange}
        {...rest}
        className={`w-full block text-lg p-3 outline-none rounded bg-gray-900 text-white-100 border-b-2 ${
          errorMessage ? 'border-red-600' : 'border-gray-900'
        } focus:border-white`}
      />
      {errorMessage && (
        <p className="text-right text-sm text-red-600"> {errorMessage}</p>
      )}
    </div>
  );
};
