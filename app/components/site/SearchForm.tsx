import { FormEvent, useState } from 'react';
import { escapeCPF } from '@/lib/utils/escapeCPF';

type Props = {
  onSearchButton: (cpf: string) => void;
  loading: boolean;
  errorMessage?: string;
};

export const SearchForm = ({
  onSearchButton,
  loading,
  errorMessage,
}: Props) => {
  const [cpfInput, setCpfInput] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearchButton(cpfInput);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="cpf" className="mb-2 block text-base font-medium text-gray-200">
          Qual é o seu CPF?
        </label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          inputMode="numeric"
          placeholder="000.000.000-00"
          className={`w-full rounded-xl border bg-gray-950 px-4 py-4 text-center text-2xl font-mono tracking-wider text-white transition-colors disabled:opacity-50 sm:text-3xl ${
            errorMessage
              ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20'
              : 'border-gray-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
          }`}
          autoFocus
          value={cpfInput}
          onChange={(e) => setCpfInput(escapeCPF(e.target.value))}
          disabled={loading}
          aria-invalid={Boolean(errorMessage)}
          aria-describedby={errorMessage ? 'cpf-error' : undefined}
        />
        {errorMessage && (
          <p id="cpf-error" className="mt-2 text-center text-sm text-red-400">
            {errorMessage}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-xl border-b-4 border-amber-800 bg-amber-600 px-4 py-3.5 text-lg font-semibold text-white transition-colors hover:bg-amber-500 active:border-b-2 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Buscando...' : 'Descobrir meu amigo'}
      </button>
    </form>
  );
};
