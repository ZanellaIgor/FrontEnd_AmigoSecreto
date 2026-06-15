'use client';
import { useState } from 'react';
import { searchCPF } from '@/lib/api/site';
import { SearchResult } from '@/lib/types/SearchResult';
import { SearchForm } from './SearchForm';
import { SearchReveal } from './SearchReveal';
import { toast } from 'sonner';

type Props = {
  id: number;
};

export const Search = ({ id }: Props) => {
  const [results, setResults] = useState<SearchResult>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearchButton = async (cpf: string) => {
    setError('');
    const digits = cpf.replace(/\D/g, '');

    if (!digits) {
      setError('Informe seu CPF');
      return;
    }

    if (digits.length !== 11) {
      setError('CPF deve ter 11 dígitos');
      return;
    }

    setLoading(true);
    const result = await searchCPF(id, digits);
    setLoading(false);

    if (!result) {
      setError('CPF não encontrado neste evento');
      toast.error('CPF não encontrado');
      return;
    }

    setResults(result);
    toast.success('Sorteio encontrado!');
  };

  const handleSearchAgain = () => {
    setResults(undefined);
    setError('');
  };

  return (
    <section className="rounded-2xl border border-gray-700/80 bg-gray-900/80 p-6 shadow-xl shadow-black/20 backdrop-blur-sm">
      {!results && (
        <SearchForm
          onSearchButton={handleSearchButton}
          loading={loading}
          errorMessage={error}
        />
      )}
      {results && (
        <SearchReveal results={results} onSearchAgain={handleSearchAgain} />
      )}
    </section>
  );
};
