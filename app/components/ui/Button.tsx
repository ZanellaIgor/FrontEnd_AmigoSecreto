type Props = {
  value: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
  className?: string;
};

export const Button = ({
  value,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  variant = 'primary',
  fullWidth = true,
  className = '',
}: Props) => {
  const isDisabled = disabled || loading;

  const variantClass = {
    primary:
      'bg-amber-600 text-white border-amber-800/60 hover:bg-amber-500 active:border-b-2',
    secondary:
      'bg-gray-700 text-gray-100 border-gray-600 hover:bg-gray-600 active:border-b-2',
    ghost:
      'bg-transparent text-gray-300 border-transparent hover:bg-gray-800 active:border-b-4',
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-lg border-b-4 px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${fullWidth ? 'w-full' : ''} ${variantClass} ${className}`}
      disabled={isDisabled}
      aria-busy={loading}
    >
      {loading ? 'Aguarde...' : value}
    </button>
  );
};
