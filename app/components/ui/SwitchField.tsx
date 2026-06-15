type Props = {
  id: string;
  label: string;
  hint?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
};

export const SwitchField = ({
  id,
  label,
  hint,
  checked,
  disabled = false,
  onChange,
}: Props) => {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-1 ${
        disabled ? 'opacity-60' : ''
      }`}
    >
      <div className="min-w-0">
        <label htmlFor={id} className="block text-sm font-medium text-gray-200">
          {label}
        </label>
        {hint && <p className="mt-0.5 text-xs text-gray-500">{hint}</p>}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40 ${
          checked ? 'bg-amber-600' : 'bg-gray-700'
        } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span
          aria-hidden
          className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};
