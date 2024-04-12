import React, { useState } from 'react';
import { escapeCPF } from '../utils/functions/escapeCPF';
type Props = {
  onSearchButton: (cpf: string) => void;
  loading: boolean;
};

export const SearchForm = ({ onSearchButton, loading }: Props) => {
  const [cpfInput, setCpfInput] = useState<string>('');
  return (
    <div>
      <label htmlFor="cpf" className="mb3-3 text-xl">
        Qual seu CPF?
      </label>
      <input
        type="text"
        id="cpf"
        name="cpf"
        inputMode="numeric"
        placeholder="000.000.000-00"
        className="w-full op-3 bg-white text-black text-center text-4xl outline-none rounded-lg disabled:opacity-50"
        autoFocus
        value={cpfInput}
        onChange={(e) => setCpfInput(escapeCPF(e.target.value))}
        disabled={loading}
      />

      <button
        className="w-full p-3 mt-3 rounded-lg bg-blue-800 text-white text-4xl border-b-4 border-blue-600 active:border-0 disabled:opacity-50"
        onClick={(e) => onSearchButton(cpfInput)}
        disabled={loading}
      >
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
    </div>
  );
};
