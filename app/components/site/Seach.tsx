'use client';
import { useState } from 'react';
import * as api from '../api/site';
import { SearchResult } from '../types/SearchResul';
import { SearchForm } from './SearchForm';
import { SearchReveal } from './SearchReveal';

type Props = {
  id: number;
};

export const Search = ({ id }: Props) => {
  const [results, setResults] = useState<SearchResult>();
  const [loading, setLoading] = useState(false);

  const handleSearchButton = async (cpf: string) => {
    setLoading(true);
    if (!cpf) return;
    const result = await api.searchCPF(id, cpf);
    setLoading(false);
    if (!result) return alert('CPF não encontrado');
    setResults(result);
  };
  return (
    <section className="bg-gray-900 p-5 roounded">
      {!results && (
        <SearchForm onSearchButton={handleSearchButton} loading={loading} />
      )}
      {results && <SearchReveal results={results} />}
    </section>
  );
};
